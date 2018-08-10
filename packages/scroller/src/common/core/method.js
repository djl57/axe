import { ease } from '../tools/const'
import { getMatrixTranslateY } from '../tools/compute'
import { styleNames, offsetTop, preventDefaultException, dispatchEvent } from '../tools/dom'
import { requestAF, cancelAF } from '../tools/util'

export default {
  _translateY (y) {
    this.y = y
    this.scrollStyle[styleNames['transform']] = `translateY(${y}px)${this.translateZ}`
  },

  _transition (style) {
    if (style['Duration'] && parseInt(style['Duration']) > 0) {
      this.isInTransition = true
    } else {
      this.isInTransition = false
    }

    for (let name in style) {
      this.scrollStyle[styleNames['transition' + name]] = style[name]
    }
  },

  _animation () {
    if (!this.listeners['scroll']) {
      return
    }

    let currentY = this.getLiveY()

    if (Math.abs(currentY - this.previousY) > this.options.scrollLimitDistance) {
      this.previousY = currentY
      this.trigger('scroll', { y: currentY })
    }

    this.animationTimer = requestAF(() => {
      if (this.isInTransition) {
        this._animation()
      }
    })
  },

  _checkPulltop () {
    if (this.listeners['pulltop']) {
      let pullTopDistance = this.minScrollY + this.options.pulltopLimitDistance

      if (this.y > pullTopDistance) {
        this.pullingtop = true
        this.trigger('pulltop')
        this.scrollTo(pullTopDistance, this.options.bounceDuration, 'bounce')
        return true
      }

      return false
    }

    return false
  },

  _checkPullbottom () {
    if (this.listeners['pullbottom']) {
      let pullBottomDistance = this.maxScrollY - this.options.pullbottomLimitDistance

      if (this.y < pullBottomDistance) {
        this.pullingbottom = true
        this.trigger('pullbottom')
        this.scrollTo(pullBottomDistance, this.options.bounceDuration, 'bounce')
        return true
      }

      return false
    }

    return false
  },

  _checkClick (e) {
    // 如果处于惯性滚动中，这时突然触摸上去，中断惯性滚动，此时不应该触发click事件
    let preventClick = this.stopFromTransition

    this.stopFromTransition = false

    if (!this.isMoved && !preventClick) {
      if (this.options.click && !preventDefaultException(e.target, this.options.preventDefaultException)) {
        dispatchEvent(e, 'click')
      }

      return true
    }

    return false
  },

  _getMomentum (distance, time, wrapHeight) {
    let duration = this.options.momentumDuration
    let speed = Math.abs(distance / time)
    let targetY = this.y + (speed / this.options.deceleration) * (distance < 0 ? -1 : 1)
    let maxRatio = Math.max(4 * this.options.bounceRate, 15 * this.options.bounceRate / speed)

    // 超出边界则减小惯性距离
    if (targetY > this.minScrollY) {
      duration = this.options.momentumBounceDuration
      targetY = this.minScrollY + Math.min(wrapHeight / maxRatio, this.options.bounceLimitDistance)
    } else if (targetY < this.maxScrollY) {
      duration = this.options.momentumBounceDuration
      targetY = this.maxScrollY - Math.min(wrapHeight / maxRatio, this.options.bounceLimitDistance)
    }

    return {
      duration,
      targetY: Math.round(targetY)
    }
  },

  getLiveY () {
    return getMatrixTranslateY(this.scrollComputedStyle[styleNames['transform']])
  },

  stop () {
    if (this.isInTransition) {
      cancelAF(this.animationTimer)

      this._transition({
        'Duration': '0ms'
      })

      this._translateY(this.getLiveY())
      this.stopFromTransition = true
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

    this.wrapOffsetTop = offsetTop(this.wrapEl)
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

  on (eventName, fn) {
    this.listeners[eventName] = fn
  },

  trigger (eventName, info) {
    if (this.listeners[eventName]) {
      this.listeners[eventName](info)
    }
  },

  setScroll (min, max) {
    this.minScrollY = min - this.relativeY
    this.maxScrollY = max - this.relativeY
  },

  setScrollByElement (el) {
    if (typeof el === 'string') {
      el = this.scrollEl.querySelector(el)
    }

    this.minScrollY = -el.offsetTop - this.relativeY
    this.maxScrollY = -(el.offsetTop + el.offsetHeight - this.wrapEl.offsetHeight) - this.relativeY
  },

  resetScroll (duration = this.options.bounceDuration, style = 'bounce') {
    let roundY = Math.round(this.y)

    if (roundY > this.minScrollY) {
      this.scrollTo(this.minScrollY, duration, style)
      return true
    } else if (roundY < this.maxScrollY) {
      this.scrollTo(this.maxScrollY, duration, style)
      return true
    }

    return false
  },

  scrollTo (y, duration = 0, style = 'swipe') {
    if (y === this.y) {
      return
    }

    if (duration > 0) {
      this._transition({
        'TimingFunction': ease[style],
        'Duration': duration + 'ms'
      })

      this._animation()
    } else {
      this.trigger('scrollend', { y })
    }

    this._translateY(y)
  },

  scrollToElement (el, valign, duration, style) {
    if (typeof el === 'string') {
      el = this.scrollEl.querySelector(el)
    }

    let top = offsetTop(el) - this.wrapOffsetTop

    if (valign === 'center') {
      top -= Math.round(el.offsetHeight / 2 - this.wrapEl.offsetHeight / 2)
    } else if (valign === 'bottom') {
      top -= (el.offsetHeight - this.wrapEl.offsetHeight)
    }

    this.scrollTo(top, duration, style)
  },

  scrollByOffset (distance, duration, style) {
    this.scrollTo(this.y + distance, duration, style)
  },

  pulltopDone (shouldResetScroll = true) {
    this.pullingtop = false

    if (shouldResetScroll) {
      this.resetScroll()
    }
  },

  pullbottomDone (shouldResetScroll = true) {
    this.pullingbottom = false

    if (shouldResetScroll) {
      this.resetScroll()
    }
  }
}
