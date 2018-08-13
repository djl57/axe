import { isAndroid } from '../tools/const'
import { preventDefaultException, scrollFromBody } from '../tools/dom'
import { getNow, isFunc } from '../tools/util'

export default {
  _touchstart (e) {
    if (this.isDisabled || !this.domLoaded) {
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
    this.distanceY = 0
    this.movingDistanceY = 0
    this.isMoved = false
    this.pulltopstarted = false
    this.pullbottomstarted = false

    this.trigger('touchstart', { y: this.y })
  },

  _touchmove (e) {
    if (this.isDisabled || !this.isInTouch || !this.domLoaded) {
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
    this.distanceY += deltaY

    // We need to move at least momentumLimitDistance pixels for the scrolling to initiate
    if (now - this.endTime > this.options.momentumLimitTime && Math.abs(this.distanceY) < this.options.momentumLimitDistance) {
      return
    }

    // 超出边界减缓滑动
    let isOverTop = newY > this.minScrollY
    let isOverBottom = newY < this.maxScrollY
    let bounceY = this.y + deltaY / 3

    if (isOverTop) {
      if (this.options.bounce.top) {
        newY = Math.min(bounceY, this.minScrollY + this.options.bounceLimitDistance)

        // 下拉刷新
        if (!this.pullingtop) {
          if (newY - this.minScrollY > this.options.pulltopLimitDistance) {
            if (!this.pulltopstarted) {
              this.pulltopstarted = true
              this.trigger('pulltopstart')
            }
          } else {
            if (this.pulltopstarted) {
              this.pulltopstarted = false
              this.trigger('pulltopcancel')
            }
          }
        }
      } else {
        newY = this.minScrollY
      }
    } else if (isOverBottom) {
      if (this.options.bounce.bottom) {
        newY = Math.min(bounceY, this.maxScrollY + this.options.bounceLimitDistance)

        // 上拉加载
        if (!this.pullingbottom) {
          if (newY - this.maxScrollY < -this.options.pullbottomLimitDistance) {
            if (!this.pullbottomstarted) {
              this.pullbottomstarted = true
              this.trigger('pullbottomstart')
            }
          } else {
            if (this.pullbottomstarted) {
              this.pullbottomstarted = false
              this.trigger('pullbottomcancel')
            }
          }
        }
      } else {
        newY = this.maxScrollY
      }
    }

    this._translateY(newY)

    if (!this.isMoved) {
      this.isMoved = true
      this.trigger('scrollstart', { y: this.y })
    } else {
      if (Math.abs(this.y - this.previousY) > this.options.scrollLimitDistance) {
        this.previousY = this.y
        this.trigger('scroll', { y: this.y })
      }
    }

    this.trigger('touchmove', { y: this.y })

    // 惯性滚动数据记录
    if (now - this.startTime > this.options.momentumLimitTime) {
      this.movingDistanceY = newY - this.startY
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
    if (this.isDisabled || !this.isInTouch || !this.domLoaded) {
      return
    }

    this.isInTouch = false

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault()
    }

    if (this.options.stopPropagation) {
      e.stopPropagation()
    }

    this.trigger('touchend', { y: this.y })

    let deltaY = this.y - this.startY
    let newY = Math.round(this.y)
    let now = this.endTime = getNow()
    let duration = now - this.startTime
    let distanceY = newY - this.startY

    this.distanceY += deltaY

    if (duration > this.options.momentumLimitTime) {
      this.movingDistanceY = deltaY
    }

    // 检查是否顶部下拉加载
    if (this._checkPulltop()) {
      return
    }

    // 检查是否底部上拉加载
    if (this._checkPullbottom()) {
      return
    }

    // 检查是否为click操作
    if (this._checkClick(e)) {
      return
    }

    // 如果超出边界则回弹
    if (this.resetScroll()) {
      return
    }

    this._translateY(newY)

    // 判断是否需要惯性滚动
    if (
      this.options.momentum &&
      duration < this.options.momentumLimitTime &&
      Math.abs(distanceY) > this.options.momentumLimitDistance
    ) {
      let wrapHeight = ((distanceY > 0 && this.options.bounce.top) || (distanceY < 0 && this.options.bounce.bottom)) ? this.wrapEl.offsetHeight : 0
      let momentum = this._getMomentum(distanceY, duration, wrapHeight)
      let easing = 'swipe'

      if (momentum.targetY > this.minScrollY || momentum.targetY < this.maxScrollY) {
        easing = 'swipeBounce'
      }

      this.scrollTo(momentum.targetY, momentum.duration, easing)

      return
    }

    if (this.isMoved) {
      this.trigger('scrollend', { y: this.y })
    }
  },

  _touchcancel (e) {
    this._touchend(e)
  },

  _transitionend (e) {
    if (e.target !== this.scrollEl || !this.isInTransition || !this.domLoaded) {
      return
    }

    this._transition({
      'Duration': '0ms'
    })

    // 超出边界则回弹
    if (
      (this.y > this.minScrollY && !this.pullingtop) ||
      (this.y < this.maxScrollY && !this.pullingbottom)
    ) {
      this.resetScroll()
    } else if (!this.pullingtop && !this.pullingbottom) {
      if (isFunc(this.pullHideFn)) {
        this.pullHideFn()
        this.pullHideFn = null
      }

      this.trigger('scrollend', { y: this.y })
    } else if (
      (this.pullingtop && this.options.pulltopLimitDistance === 0) ||
      (this.pullingbottom && this.options.pullbottomLimitDistance === 0)
    ) {
      this.trigger('scrollend', { y: this.y })
    }
  },

  _load (e) {
    this.domLoaded = true
    this.refresh()
  },

  _resize (e) {
    if (this.isDisabled) {
      return
    }

    // fix a scroll problem under Android condition
    if (isAndroid) {
      this.wrapEl.scrollTop = 0
    }

    clearTimeout(this.resizeTimer)

    this.resizeTimer = setTimeout(() => {
      this.refresh()
    }, this.options.resizeTime)
  },

  _click (e) {
    if (!this.isDisabled && !e._constructed) {
      if (!preventDefaultException(e.target, this.options.preventDefaultException)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
  }
}
