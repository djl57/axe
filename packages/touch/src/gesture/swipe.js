import {
  swipe as swipeDefaults
} from '../defaults'

export default function swipe (node, a, b) {
  let opts, callback, sTime, sTouch, eTouch

  if (typeof a === 'function') {
    callback = a
    opts = Object.assign({}, swipeDefaults, b)
  } else {
    callback = b
    opts = Object.assign({}, swipeDefaults, a)
  }

  node.addEventListener('touchstart', (e) => {
    e.preventDefault()

    sTime = e.timeStamp
    sTouch = eTouch = e.targetTouches[0]
  }, false)

  if (typeof opts.touchmove === 'function') {
    node.addEventListener('touchmove', (e) => {
      eTouch = e.targetTouches[0]

      if (opts.direction === 'horizontal') {
        opts.touchmove(eTouch.pageX - sTouch.pageX)
      } else {
        opts.touchmove(eTouch.pageY - sTouch.pageY)
      }
    }, false)
  }

  node.addEventListener('touchend', (e) => {
    eTouch = e.changedTouches[0]

    let time = e.timeStamp - sTime
    let offset, direction

    if (opts.direction === 'horizontal') {
      offset = eTouch.pageX - sTouch.pageX
      direction = offset > 0 ? 'right' : 'left'
    } else {
      offset = eTouch.pageY - sTouch.pageY
      direction = offset > 0 ? 'down' : 'up'
    }

    if (
      Math.abs(offset) >= opts.offset ||
      Math.abs(offset) / time * 1000 >= opts.speed
    ) {
      callback && callback(direction)
    }
  }, false)
}
