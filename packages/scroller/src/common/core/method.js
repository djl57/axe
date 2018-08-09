import { styleNames } from '../tools/dom'

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

  _resetScrollY (duration, easing) {
    let roundY = Math.round(this.y)

    if (roundY > this.minScrollY) {
      this.scrollTo(this.minScrollY, duration, easing)
      return true
    } else if (roundY < this.maxScrollY) {
      this.scrollTo(this.maxScrollY, duration, easing)
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
  }
}
