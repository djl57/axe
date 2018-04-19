import {
  swipe as swipeDefaults
} from '../defaults'
import { getDirection } from '../utils'
import ObjectAssign from 'object-assign'

export default function swipe (node, a, b) {
  let opts, callback, sTime, sTouch, eTouch

  if (typeof a === 'function') {
    callback = a
    opts = ObjectAssign({}, swipeDefaults, b)
  } else {
    callback = b
    opts = ObjectAssign({}, swipeDefaults, a)
  }

  node.addEventListener('touchstart', (e) => {
    if (opts.prevent) {
      e.preventDefault()
    }

    sTime = e.timeStamp
    sTouch = eTouch = e.targetTouches[0]
  }, false)

  if (typeof opts.touchmove === 'function') {
    node.addEventListener('touchmove', (e) => {
      eTouch = e.targetTouches[0]
      opts.touchmove(eTouch.pageX - sTouch.pageX, eTouch.pageY - sTouch.pageY)
    }, false)
  }

  node.addEventListener('touchend', (e) => {
    eTouch = e.changedTouches[0]

    let time = e.timeStamp - sTime
    let offsetX = eTouch.pageX - sTouch.pageX
    let offsetY = eTouch.pageY - sTouch.pageY
    let offset, direction

    if (opts.axis === 'horizontal') {
      offset = offsetX
      direction = getDirection(offsetX, 0)
    } else if (opts.axis === 'vertical') {
      offset = offsetY
      direction = getDirection(0, offsetY)
    } else {
      offset = Math.abs(offsetX) > Math.abs(offsetY) ? offsetX : offsetY
      direction = getDirection(offsetX, offsetY)
    }

    if (
      Math.abs(offset) >= opts.offset ||
      Math.abs(offset) / time * 1000 >= opts.speed
    ) {
      callback && callback(direction)
    }
  }, false)
}
