import {
  tap as tapDefaults,
  longtap as longtapDefaults
} from '../defaults'
import ObjectAssign from 'object-assign'

function handler (node, inject) {
  let st, sx, sy

  node.addEventListener('touchstart', (e) => {
    e.preventDefault()

    const touch = e.targetTouches[0]
    st = e.timeStamp
    sx = touch.pageX
    sy = touch.pageY
  }, false)

  node.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0]

    inject({
      time: e.timeStamp - st,
      offsetX: Math.abs(touch.pageX - sx),
      offsetY: Math.abs(touch.pageY - sy)
    })
  }, false)
}

export function tap (node, a, b) {
  let opts, callback

  if (typeof a === 'function') {
    callback = a
    opts = ObjectAssign({}, tapDefaults, b)
  } else {
    callback = b
    opts = ObjectAssign({}, tapDefaults, a)
  }

  handler(node, (info) => {
    if (
      info.time <= opts.time &&
      info.offsetX <= opts.offset &&
      info.offsetY <= opts.offset
    ) {
      callback && callback()
    }
  })
}

export function longtap (node, a, b) {
  let opts, callback

  if (typeof a === 'function') {
    callback = a
    opts = ObjectAssign({}, longtapDefaults, b)
  } else {
    callback = b
    opts = ObjectAssign({}, longtapDefaults, a)
  }

  handler(node, (info) => {
    if (
      info.time > opts.time &&
      info.offsetX <= opts.offset &&
      info.offsetY <= opts.offset
    ) {
      callback && callback()
    }
  })
}

export function doubletap (node, a, b) {
  let opts, callback
  let status = 0

  if (typeof a === 'function') {
    callback = a
    opts = ObjectAssign({}, tapDefaults, b)
  } else {
    callback = b
    opts = ObjectAssign({}, tapDefaults, a)
  }

  handler(node, (info) => {
    if (
      info.time <= opts.time &&
      info.offsetX <= opts.offset &&
      info.offsetY <= opts.offset
    ) {
      if (status === 0) {
        status = 1
        setTimeout(() => {
          status = 0
        }, opts.time)
      } else if (status === 1) {
        callback && callback()
        status = 0
      }
    } else {
      status = 0
    }
  })
}