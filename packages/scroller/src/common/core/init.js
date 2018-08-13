import { ease } from '../tools/const'
import { styleNames, transitionend, addEvent } from '../tools/dom'

export default {
  // 初始化位置和事件
  _init () {
    this._initStyle() // 样式
    this._initEvents(addEvent) // 绑定事件

    if (!this.options.loadRefresh) {
      this.domLoaded = true
      this.refresh()
    }
  },

  _initStyle () {
    this._transition({
      'Property': styleNames['transform'],
      'TimingFunction': ease.bounce,
      'Duration': '0ms'
    })

    this._translateY(this.options.startY) // 初始化滚动位置
    this.resetScroll()
  },

  _initEvents () {
    this._loadBind = this._load.bind(this)
    this._resizeBind = this._resize.bind(this)
    this._clickBind = this._click.bind(this)
    this._touchstartBind = this._touchstart.bind(this)
    this._touchmoveBind = this._touchmove.bind(this)
    this._touchendBind = this._touchend.bind(this)
    this._touchcancelBind = this._touchcancel.bind(this)
    this._transitionendBind = this._transitionend.bind(this)

    this._handleEvents(addEvent)
  },

  _handleEvents (eventOperate) {
    let targetEl = !this.options.touchToWrapper ? window : this.wrapEl

    // load
    if (this.options.loadRefresh) {
      eventOperate(window, 'load', this._loadBind, { passive: false, capture: false })
    }

    // resize
    eventOperate(window, 'resize', this._resizeBind, { passive: false, capture: false })

    if (this.options.click) {
      eventOperate(this.wrapEl, 'click', this._clickBind, { passive: false, capture: true })
    }

    // touch
    eventOperate(this.wrapEl, 'touchstart', this._touchstartBind, { passive: false, capture: false })
    eventOperate(targetEl, 'touchmove', this._touchmoveBind, { passive: false, capture: false })
    eventOperate(targetEl, 'touchend', this._touchendBind, { passive: false, capture: false })
    eventOperate(targetEl, 'touchcancel', this._touchcancelBind, { passive: false, capture: false })

    // transitionend
    eventOperate(this.scrollEl, transitionend, this._transitionendBind, { passive: false, capture: false })
  }
}
