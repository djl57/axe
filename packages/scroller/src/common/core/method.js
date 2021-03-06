import { ease } from '../tools/const'
import { getMatrixTranslateY } from '../tools/compute'
import { styleNames, offsetTop, preventDefaultException, createEvent, dispatchEvent, removeEvent } from '../tools/dom'
import { requestAF, cancelAF, isString, isNumber, isArray } from '../tools/util'

const LOADED_IMGS = {}

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

    this.trigger('scroll', { y: this.getLiveY() })

    this.animationTimer = requestAF(() => {
      if (this.isInTransition) {
        this._animation()
      }
    })
  },

  _checkPulltop () {
    if (this.listeners['pulltop'] && !this.pullingtop) {
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
    if (this.listeners['pullbottom'] && !this.pullingbottom) {
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
    if (!this.options.click) {
      return false
    }

    // 如果处于惯性滚动中，这时突然触摸上去，中断惯性滚动，此时不应该触发click事件
    // 或者处于上拉、下拉加载中，阻止click触发
    let preventClick = this.stopFromTransition || this.pulling

    this.stopFromTransition = false

    if (!this.isMoved && !preventClick && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      if (!this.events['click']) {
        this.events['click'] = createEvent(e, 'click')
      }

      dispatchEvent(e, this.events['click'])

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

  enable () {
    this.isDisabled = false
  },

  disable () {
    this.isDisabled = true
  },

  destroy () {
    this.stop()
    this._handleEvents(removeEvent)
  },

  on (eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(fn)
    } else {
      this.listeners[eventName] = [fn]
    }
  },

  off (eventName, fn) {
    if (!fn) {
      return
    }

    if (this.listeners[eventName]) {
      let index = this.listeners[eventName].findIndex(item => item === fn)

      if (index !== -1) {
        this.listeners[eventName].splice(index, 1)
      }

      if (this.listeners[eventName].length === 0) {
        this.listeners[eventName] = null
      }
    }
  },

  trigger (eventName, info) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(fn => fn(info))
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

    this.resetScroll()

    // 上拉下拉开启
    this.pullingtop = false
    this.pullingbottom = false

    this.trigger('refresh')
  },

  // 图片未加载完成时，不会算上其高度，因此图片渲染完成后，滚动的高度比实际小
  refreshAfterImgLoaded (imgs) {
    let i
    let children
    let image
    let src
    let imgEls = []
    let loadCount = 0

    if (isString(imgs)) {
      imgEls = this.scrollEl.querySelectorAll(imgs)
    } else if (isArray(imgs)) {
      imgs.forEach(img => {
        if (isString(img)) {
          children = this.scrollEl.querySelectorAll(img)
          for (i = 0; i < children.length; i++) {
            imgEls.push(children[i])
          }
        } else {
          imgEls.push(img)
        }
      })
    } else if (imgs && imgs.length > 0) {
      imgEls = imgs
    }

    if (imgEls.length > 0) {
      for (i = 0; i < imgEls.length; i++) {
        src = imgEls[i].getAttribute('src')

        if (!LOADED_IMGS[src]) {
          image = new Image()
          image.onload = image.onerror = () => {
            loadCount++
            LOADED_IMGS[src] = true // 已下载的图片缓存下来

            if (loadCount >= imgEls.length) {
              this.refresh()
            }
          }
          image.src = src
        } else {
          loadCount++

          if (loadCount >= imgEls.length) {
            this.refresh()
          }
        }
      }
    } else {
      this.refresh()
    }
  },

  setScroll (min, max) {
    if (isNumber(min)) {
      this.minScrollY = min - this.relativeY
    }

    if (isNumber(max)) {
      this.maxScrollY = max - this.relativeY
    }

    if (this.maxScrollY >= this.minScrollY) {
      this.maxScrollY = this.minScrollY
    }

    this.resetScroll()
  },

  setScrollByElement (el) {
    if (typeof el === 'string') {
      el = this.scrollEl.querySelector(el)
    }

    this.setScroll(-el.offsetTop, -(el.offsetTop + el.offsetHeight - this.wrapEl.offsetHeight))
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
        'TimingFunction': ease[style] || style,
        'Duration': duration + 'ms'
      })

      this._animation()
    } else {
      this.trigger('scrollend', { y })
    }

    this._translateY(y)
  },

  scrollToElement (el, duration, valign, style) {
    if (typeof el === 'string') {
      el = this.scrollEl.querySelector(el)
    }

    let top = offsetTop(el) - this.wrapOffsetTop

    if (valign === 'middle') {
      top -= Math.round(el.offsetHeight / 2 - this.wrapEl.offsetHeight / 2)
    } else if (valign === 'bottom') {
      top -= (el.offsetHeight - this.wrapEl.offsetHeight)
    }

    this.scrollTo(top, duration, style)
  },

  scrollByOffset (distance, duration, style) {
    this.scrollTo(this.y + distance, duration, style)
  },

  _pullDone (options) {
    if (options.needLoadImgs) {
      this.refreshAfterImgLoaded(options.needLoadImgs)
    } else if (options.refresh !== false) {
      this.refresh()
    } else {
      this.pullingtop = false
      this.pullingbottom = false
    }

    if (options.reset !== false) {
      this.onPullHide = options.onHide
      this.resetScroll()
    }
  },

  pulltopDone (options = {}) {
    this._pullDone(options)
  },

  pullbottomDone (options = {}) {
    this._pullDone(options)
  }
}
