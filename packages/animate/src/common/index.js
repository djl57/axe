import { getStyleName, cssTransform, transitionend, animationend } from './utils'

export default class Animate {
  constructor (el) {
    this.el = typeof el !== 'string' ? el : document.querySelector(el)

    if (!this.el) {
      console.error('[@axe/animate] The element is not exist.')
    }

    this.inlineStyle = this.el.style
    // this.computedStyle = window.getComputedStyle(this.el, null)

    this.callbackEnd = null // 过渡结束后的回调函数

    // 过渡结束监听
    this.el.addEventListener(transitionend, () => {
      this.callbackEnd && this.callbackEnd()
      this.callbackEnd = null
    }, false)

    // 动画结束监听
    this.el.addEventListener(animationend, () => {
      this.callbackEnd && this.callbackEnd()
      this.callbackEnd = null
    }, false)
  }

  style (css) {
    if (!css || typeof css !== 'object') return

    let key, value

    for (key in css) {
      value = css[key] || ''

      if (value.indexOf('transform') !== -1) {
        value = value.replace('transform', cssTransform)
      }

      this.inlineStyle[getStyleName(key)] = value
    }

    return this
  }

  done (fn) {
    this.callbackEnd = fn

    return this
  }
}
