import { styleNames, transitionend } from '../tools/dom'
import { ease } from '../tools/compute'

export default {
  // 初始化位置和事件
  _init () {
    this._initStyle() // 样式
    this._initEvents() // 事件

    this.refresh()
  },

  _initStyle () {
    this._transition({
      'Property': styleNames['transform'],
      'TimingFunction': ease.bounce.style,
      'Duration': '0ms'
    })

    this._translateY(this.options.startY) // 初始化滚动位置
  },

  _initEvents () {
    let targetEl = this.options.touchOnWindow ? window : this.wrapEl

    window.addEventListener('resize', this._resize.bind(this), { passive: false, capture: false })

    // click
    if (this.options.click) {
      this.wrapEl.addEventListener('click', this._click.bind(this), { passive: false, capture: false })
    }

    // touch
    this.wrapEl.addEventListener('touchstart', this._touchstart.bind(this), { passive: false, capture: false })
    targetEl.addEventListener('touchmove', this._touchmove.bind(this), { passive: false, capture: false })
    targetEl.addEventListener('touchend', this._touchend.bind(this), { passive: false, capture: false })
    targetEl.addEventListener('touchcancel', this._touchcancel.bind(this), { passive: false, capture: false })

    // transition
    this.scrollEl.addEventListener(transitionend, this._transitionend.bind(this), { passive: false, capture: false })
  }
}
