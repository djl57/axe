import { getProperty } from './utils'

class Animate {
  constructor (node) {
    this.node = node
    this.duration = 0
  }

  _addStyle (style) {
    if (!this.node) return

    Object.keys(style).forEach(key => {
      this.node.style[getProperty(key)] = style[key]
    })
  }

  _handleTransitionProperty (style) {
    if (style['transition']) {
      let tmp = style['transition'].split(' ')
      tmp[0] = getProperty(tmp[0])
      style['transition'] = tmp.join(' ')
    } else if (style['transitionProperty']) {
      style['transitionProperty'] = getProperty(style['transitionProperty'])
    }

    return style
  }

  _getDuraion (style) {
    if (!style) return 0

    let duration = 0
    let delay = 0

    if (style['transition']) {
      duration = style['transition'].split(' ')[1]
    } else if (style['animation']) {
      let arr = style['animation'].split(' ')
      duration = arr[1]
      delay = arr[3] || 0
    } else if (style['transitionDuration']) {
      duration = style['transitionDuration']
    } else if (style['animationDuration']) {
      duration = style['animationDuration']
    }

    if (style['animationDelay']) {
      delay = style['animationDelay']
    }

    if (duration !== 0) {
      duration = parseFloat(duration) * (duration.indexOf('ms') === -1 ? 1000 : 1)
    }
    if (delay !== 0) {
      delay = parseFloat(delay) * (delay.indexOf('ms') === -1 ? 1000 : 1)
    }

    return duration + delay
  }

  init (style, callback) {
    if (style && typeof style === 'object') {
      style = this._handleTransitionProperty(style)

      this._addStyle(style)
      callback && callback(style)
    }

    return this
  }

  run (style, callback) {
    let duration = this._getDuraion(style)

    setTimeout(() => {
      if (style && typeof style === 'object') {
        style = this._handleTransitionProperty(style)

        this._addStyle(style)
        callback && callback(style)
      }
    }, this.duration)

    this.duration += duration

    return this
  }

  end (style, callback) {
    // transitionend事件兼容性不好，故而使用定时器代替
    setTimeout(() => {
      if (style && typeof style === 'object') {
        style = this._handleTransitionProperty(style)

        this._addStyle(style)
        callback && callback(style)
      }
    }, this.duration)
  }
}

export default function animate (node) {
  return new Animate(node)
}