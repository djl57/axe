import { ease } from '../tools/compute'
import { preventDefaultException, scrollFromBody } from '../tools/dom'
import { getNow } from '../tools/util'

export default {
  _touchstart (e) {
    if (this.isDisabled) {
      return
    }

    this.isInTouch = true

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault()
    }

    if (this.options.stopPropagation) {
      e.stopPropagation()
    }

    this.stop() // 停止正在滚动

    let point = e.touches[0]

    this.startTime = getNow()
    this.startY = this.y
    this.pointY = point.pageY

    this.trigger('scrollStart', { y: this.y })
  },

  _touchmove (e) {
    if (this.isDisabled || !this.isInTouch) {
      return
    }

    if (this.options.preventDefault) {
      e.preventDefault()
    }

    if (this.options.stopPropagation) {
      e.stopPropagation()
    }

    let point = e.touches[0]
    let deltaY = point.pageY - this.pointY
    let newY = this.y + deltaY
    let now = getNow()

    this.pointY = point.pageY

    // 超出边界减缓滑动
    let isOverTop = newY > this.minScrollY
    let isOverBottom = newY < this.maxScrollY

    if (isOverTop || isOverBottom) {
      if (
        (isOverTop && this.options.bounce.top) ||
        (isOverBottom && this.options.bounce.bottom)
      ) {
        let bounceY = this.y + deltaY / 3

        if (isOverTop) {
          newY = Math.min(bounceY, this.minScrollY + this.options.bounceLimitDistance)
        } else {
          newY = Math.max(bounceY, this.maxScrollY - this.options.bounceLimitDistance)
        }
      } else {
        newY = isOverTop ? this.minScrollY : this.maxScrollY
      }
    }

    this._translateY(newY)
    this.trigger('scroll', { y: this.y })

    // 惯性滚动数据记录
    if (now - this.startTime > this.options.momentumLimitTime) {
      this.startTime = now
      this.startY = newY
    }

    // 判断触摸是否已超出边界
    let scrollPos = scrollFromBody()
    let pX = this.pointX - scrollPos.left
    let pY = this.pointY - scrollPos.top

    if (
      pY < this.options.momentumLimitDistance ||
      pY > this.clientHeight - this.options.momentumLimitDistance ||
      pX < this.options.momentumLimitDistance ||
      pX > this.clientWidth - this.options.momentumLimitDistance
    ) {
      this._touchend(e)
    }
  },

  _touchend (e) {
    if (this.isDisabled || !this.isInTouch) {
      return
    }

    this.isInTouch = false

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault()
    }

    if (this.options.stopPropagation) {
      e.stopPropagation()
    }

    // 如果超出边界则回弹
    if (this._resetScrollY(this.options.bounceDuration, ease.bounce)) return

    let newY = Math.round(this.y)

    this._translateY(newY)

    let now = getNow()
    let duration = now - this.startTime
    let distanceY = newY - this.startY

    // 判断是否需要惯性滚动
    if (
      this.options.momentum &&
      duration < this.options.momentumLimitTime &&
      Math.abs(distanceY) > this.options.momentumLimitDistance
    ) {
      let wrapHeight = ((distanceY > 0 && this.options.bounce.top) || (distanceY < 0 && this.options.bounce.bottom)) ? this.wrapEl.offsetHeight : 0
      let momentum = this._getMomentum(distanceY, duration, wrapHeight)
      let easing = ease.swipe

      if (momentum.targetY > this.minScrollY || momentum.targetY < this.maxScrollY) {
        easing = ease.swipeBounce
      }

      this.scrollTo(momentum.targetY, momentum.duration, easing)

      return
    }

    this.trigger('scrollEnd', { y: this.y })
  },

  _touchcancel (e) {
    console.info('cancel')
  },

  _transitionend (e) {
    if (e.target !== this.scrollEl || !this.isInTransition) {
      return
    }

    this._transition({
      'Duration': '0ms'
    })

    // 超出边界则回弹
    if (this.y > this.minScrollY || this.y < this.maxScrollY) {
      this._resetScrollY(this.options.bounceDuration, ease.bounce)
    }
  },

  _resize (e) {

  },

  _click (e) {

  }
}
