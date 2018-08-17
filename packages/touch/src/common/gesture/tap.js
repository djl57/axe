const tapDefaults = {
  tapTime: 250,
  longtapTime: 350,
  offset: 10,
  preventDefault: true
}

export default class Tap {
  constructor (node, options) {
    this.node = typeof node === 'string' ? document.querySelector(node) : node
    this.options = Object.assign({}, tapDefaults, options)

    this.tapStatus = 0
    this.listeners = {
      tap: [],
      longtap: [],
      doubletap: []
    }

    this._init()
  }

  _init () {
    this.node.addEventListener('touchstart', (e) => {
      if (this.options.preventDefault) {
        e.preventDefault()
      }

      let point = e.targetTouches[0]
      this.st = e.timeStamp
      this.sx = point.pageX
      this.sy = point.pageY
    }, false)

    this.node.addEventListener('touchend', (e) => {
      let point = e.changedTouches[0]

      let time = e.timeStamp - this.st
      let offsetX = Math.abs(point.pageX - this.sx)
      let offsetY = Math.abs(point.pageY - this.sy)

      if (
        time <= this.options.tapTime &&
          offsetX <= this.options.offset &&
          offsetY <= this.options.offset
      ) {
        this.dispatchEvent('tap')

        if (this.listeners['doubletap'].length > 0) {
          if (this.tapStatus === 0) {
            this.tapStatus = 1

            setTimeout(() => {
              this.tapStatus = 0
            }, this.options.tapTime)
          } else if (this.tapStatus === 1) {
            this.dispatchEvent('doubletap')
            this.tapStatus = 0
          }
        }
      } else {
        this.tapStatus = 0
      }

      if (
        time > this.options.longtapTime &&
          offsetX <= this.options.offset &&
          offsetY <= this.options.offset
      ) {
        this.dispatchEvent('longtap')
      }
    }, false)
  }

  addEvent (fn, type = 'tap') {
    if (this.listeners[type]) {
      this.listeners[type].push(fn)
    }
  }

  removeEvent (fn, type = 'tap') {
    if (this.listeners[type] && this.listeners[type].length > 0) {
      let index = this.listeners[type].findIndex(item => item === fn)

      if (index !== -1) {
        this.listeners[type].splice(index, 1)
      }
    }
  }

  dispatchEvent (type = 'tap') {
    if (this.listeners[type] && this.listeners[type].length > 0) {
      this.listeners[type].forEach(fn => fn())
    }
  }
}
