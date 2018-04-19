import {
  press as pressDefaults
} from '../defaults'
import ObjectAssign from 'object-assign'

export default function press (node, a, b) {
  let opts, callback, sx, sy
  let timer = null

  if (typeof a === 'function') {
    callback = a
    opts = ObjectAssign({}, pressDefaults, b)
  } else {
    callback = b
    opts = ObjectAssign({}, pressDefaults, a)
  }

  node.addEventListener('touchstart', (e) => {
    e.preventDefault()

    const touch = e.targetTouches[0]
    sx = touch.pageX
    sy = touch.pageY

    timer = setTimeout(() => {
      callback && callback()
    }, opts.time)
  }, false)

  node.addEventListener('touchmove', (e) => {
    const touch = e.targetTouches[0]

    if (
      Math.abs(touch.pageX - sx) > opts.offset ||
      Math.abs(touch.pageY - sy) > opts.offset
    ) {
      clearTimeout(timer)
    }
  }, false)

  node.addEventListener('touchend', () => {
    clearTimeout(timer)
  }, false)
}
