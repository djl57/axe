import { throttle } from './utils'

export default class LoadMore {
  constructor ({
    el = document.documentElement,
    distance = 10,
    cutTime = 100,
    onScrollBottom
  }) {
    this.el = typeof el !== 'string' ? el : document.querySelector(el)
    this.distance = distance
    this.cutTime = cutTime
    this.onScrollBottom = onScrollBottom

    this.locked = false

    this._initEvent()
  }

  _initEvent () {
    let realScrollEl = this.el === document.documentElement ? window : this.el
    let fn = throttle(() => {
      if (!this.locked && this.isToBottom()) {
        this.onScrollBottom && this.onScrollBottom()
      }
    }, this.cutTime)

    realScrollEl.addEventListener('scroll', fn, false)
  }

  isToBottom () {
    return this.el.getBoundingClientRect().bottom < this.el.clientHeight + this.distance
  }

  lock () {
    this.locked = true
  }

  unlock () {
    this.locked = false
  }
}
