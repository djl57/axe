const pressDefaults = {
  time: 350,
  offset: 10,
  preventDefault: true
}

export default class Press {
  constructor (node, options) {
    this.node = typeof node === 'string' ? document.querySelector(node) : node
    this.options = Object.assign({}, pressDefaults, options)

    this.timer = null
    this.listeners = []

    this._init()
  }

  _init () {
    this.node.addEventListener('touchstart', (e) => {
      if (this.options.preventDefault) {
        e.preventDefault()
      }

      let point = e.targetTouches[0]
      this.sx = point.pageX
      this.sy = point.pageY

      this.timer = setTimeout(() => {
        this.dispatchEvent()
      }, this.options.time)
    }, false)

    this.node.addEventListener('touchmove', (e) => {
      let point = e.targetTouches[0]

      if (
        Math.abs(point.pageX - this.sx) > this.options.offset ||
        Math.abs(point.pageY - this.sy) > this.options.offset
      ) {
        clearTimeout(this.timer)
      }
    }, false)

    this.node.addEventListener('touchend', () => {
      clearTimeout(this.timer)
    }, false)
  }

  addEvent (fn) {
    this.listeners.push(fn)
  }

  removeEvent (fn) {
    let index = this.listeners.findIndex(item => item === fn)

    if (index !== -1) {
      this.listeners.splice(index, 1)
    }
  }

  dispatchEvent (info) {
    this.listeners.forEach(fn => fn(info))
  }
}
