import { transitionEvent, animationEvent, getStyle } from './utils'

export default class Animate {
  constructor (el) {
    this.el = typeof el !== 'string' ? el : document.querySelector(el)
    this.countEnd = 0 // 多个属性过渡时的计数器
    this.styleEnd = null // 过渡结束后重置样式
    this.callbackEnd = null // 过渡结束后的回调函数

    if (this.el) {
      // 过渡结束监听
      this.el.addEventListener(transitionEvent, (e) => {
        let count = e.target.style.transitionDuration.split(',').length

        if (++this.countEnd === count) {
          this.addStyle(this.styleEnd)
          this.callbackEnd && this.callbackEnd()

          this.countEnd = 0
          this.styleEnd = null
          this.callbackEnd = null
        }
      }, false)

      // 动画结束监听
      this.el.addEventListener(animationEvent, () => {
        this.addStyle(this.styleEnd)
        this.callbackEnd && this.callbackEnd()

        this.styleEnd = null
        this.callbackEnd = null
      }, false)
    }
  }

  addStyle (style) {
    if (!this.el || !style || typeof style !== 'object') return

    Object.keys(style).forEach(key => {
      let o = getStyle(key, style[key])
      this.el.style[o.name] = o.value
    })
  }

  start (style, cb) {
    this.addStyle(style)
    cb && cb()

    return this
  }

  end (style, cb) {
    this.styleEnd = style
    this.callbackEnd = cb
  }
}
