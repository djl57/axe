import {
  tap as tapDefaults,
  longtap as longtapDefaults
} from '../defaults'

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
    opts = Object.assign({}, tapDefaults, b)
  } else {
    callback = b
    opts = Object.assign({}, tapDefaults, a)
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
    opts = Object.assign({}, longtapDefaults, b)
  } else {
    callback = b
    opts = Object.assign({}, longtapDefaults, a)
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