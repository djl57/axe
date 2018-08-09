import { ease, getMatrixTranslateY } from '../tools/compute'
import { styleNames } from '../tools/dom'

export default {
  stop () {
    if (this.isInTransition) {
      this._transition({
        'Duration': '0ms'
      })

      this._translateY(getMatrixTranslateY(this.scrollComputedStyle[styleNames['transform']]))
    }
  },

  refresh () {
    let relativeY = this.scrollEl.offsetTop

    if (this.wrapComputedStyle.position === 'static') {
      relativeY -= this.wrapEl.offsetTop
    }

    if (this.relativeY !== relativeY) {
      this.minScrollY -= relativeY - this.relativeY
      this.relativeY = relativeY
    }

    this.maxScrollY = this.wrapEl.offsetHeight - this.scrollEl.offsetHeight - this.relativeY

    // 无需滚动
    if (this.maxScrollY >= this.minScrollY) {
      this.maxScrollY = this.minScrollY
    }
  },

  enable () {
    this.isDisabled = false
  },

  disable () {
    this.isDisabled = true
  },

  trigger (eventName) {
    // console.info(eventName)
  },

  setScroll (min, max) {
    this.minScrollY = min - this.relativeY
    this.maxScrollY = max - this.relativeY
  },

  setScrollByElement (el) {
    this.minScrollY = -el.offsetTop - this.relativeY
    this.maxScrollY = -(el.offsetTop + el.offsetHeight - this.wrapEl.offsetHeight) - this.relativeY
  },

  scrollTo (y, duration = 0, easing = ease.swipe) {
    if (y === this.y) {
      return
    }

    this._transition({
      'TimingFunction': easing.style,
      'Duration': duration + 'ms'
    })

    this._translateY(y)
  },

  scrollToElement (el, duration, easing) {
    this.scrollTo(-el.offsetTop, duration, easing)
  },

  scrollByOffset (distance, duration, easing) {
    this.scrollTo(this.y + distance, duration, easing)
  }
}
