import { getDirection } from '../utils'

const swipeDefaults = {
  axis: 'all', // x, y
  time: 300,
  speed: 200,
  offset: 100,
  preventDefault: true
}

export default class Swipe {
  constructor (node, options) {
    this.node = typeof node === 'string' ? document.querySelector(node) : node
    this.options = Object.assign({}, swipeDefaults, options)

    this.moveEvents = []
    this.listeners = []

    this._init()
  }

  _init () {
    this.node.addEventListener('touchstart', (e) => {
      if (this.options.preventDefault) {
        e.preventDefault()
      }

      this.sTime = e.timeStamp
      this.sTouch = this.eTouch = e.targetTouches[0]
    }, false)

    this.node.addEventListener('touchmove', (e) => {
      let point = e.targetTouches[0]

      if (this.moveEvents.length > 0) {
        this.moveEvents.forEach(fn => fn(point.pageX - this.sTouch.pageX, point.pageY - this.sTouch.pageY))
      }

      if (e.timeStamp - this.sTime > this.options.time) {
        this.sTime = e.timeStamp
        this.eTouch = point
      }
    }, false)

    this.node.addEventListener('touchend', (e) => {
      let point = e.changedTouches[0]

      let time = e.timeStamp - this.sTime
      let offsetX = point.pageX - this.eTouch.pageX
      let offsetY = point.pageY - this.eTouch.pageY
      let offsetXAll = point.pageX - this.sTouch.pageX
      let offsetYAll = point.pageY - this.sTouch.pageY
      let offset, offsetAll, direction

      if (this.options.axis === 'x') {
        offset = offsetX
        offsetAll = offsetXAll
        direction = getDirection(offsetXAll, 0)
      } else if (this.options.axis === 'y') {
        offset = offsetY
        offsetAll = offsetYAll
        direction = getDirection(0, offsetYAll)
      } else {
        if (Math.abs(offsetXAll) > Math.abs(offsetYAll)) {
          offset = offsetX
          offsetAll = offsetXAll
        } else {
          offset = offsetY
          offsetAll = offsetYAll
        }
        direction = getDirection(offsetXAll, offsetYAll)
      }

      if (
        Math.abs(offsetAll) >= this.options.offset ||
        Math.abs(offset) / time * 1000 >= this.options.speed
      ) {
        this.dispatchEvent(direction)
      }
    }, false)
  }

  onMove (fn) {
    this.moveEvents.push(fn)
  }

  addEvent (fn) {
    this.listeners.push(fn)
  }

  removeEvent (fn) {
    if (this.listeners.length > 0) {
      let index = this.listeners.findIndex(item => item === fn)

      if (index !== -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  dispatchEvent (info) {
    if (this.listeners.length > 0) {
      this.listeners.forEach(fn => fn(info))
    }
  }
}
