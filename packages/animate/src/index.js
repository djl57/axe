import { getProperty, isHTMLElement } from './utils'

class Animate {
  constructor (nodeOrRender) {
    if (isHTMLElement(nodeOrRender)) {
      this.node = nodeOrRender
    } else if (typeof nodeOrRender === 'function') {
      this.render = nodeOrRender
    }

    this.duration = 0
  }

  _addStyle (namespace, style) {
    if (!style || typeof style !== 'object') return

    style = this._handleTransitionProperty(style)

    if (this.node) {
      Object.keys(style).forEach(key => {
        this.node.style[getProperty(key)] = style[key]
      })
    } else if (this.render) {
      let data = {}
      let styleData = data[namespace] = {}

      Object.keys(style).forEach(key => {
        styleData[getProperty(key)] = style[key]
      })

      this.render(data)
    }
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

  init ({
    key,
    style,
    callback
  }) {
    this._addStyle(key, style)
    callback && callback()

    return this
  }

  run ({
    key,
    style,
    callback
  }) {
    setTimeout(() => {
      this._addStyle(key, style)
      callback && callback()
    }, this.duration)

    this.duration += this._getDuraion(style)

    return this
  }

  end ({
    key,
    style,
    callback
  }) {
    // transitionend事件兼容性不好，故而使用定时器代替
    setTimeout(() => {
      this._addStyle(key, style)
      callback && callback()
    }, this.duration)
  }
}

export default function animate (nodeOrRender) {
  return new Animate(nodeOrRender)
}