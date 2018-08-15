import { styleNames } from '../tools/dom'
import { ease } from '../tools/const'

const INDICATOR_MIN_LEN = 8

function Scrollbar (scrollbarEl, indicatorEl, scroller) {
  this.scroller = scroller // scroller实例

  this.scrollbarEl = scrollbarEl
  this.indicatorEl = indicatorEl

  this.scrollbarStyle = this.scrollbarEl.style
  this.indicatorStyle = this.indicatorEl.style

  this.y = 0
  this.maxY = 0
  this.ratio = 1

  this.init()
}

Object.assign(Scrollbar.prototype, {
  init () {
    this.scroller.on('refresh', () => {
      this.refresh()
    })

    this.scroller.on('scrollstart', ({ y }) => {
      this.scrollbarStyle['opacity'] = 1
      this.updatePosition(y)
    })

    this.scroller.on('scroll', ({ y }) => {
      this.updatePosition(y)
    })

    this.scroller.on('scrollend', ({ y }) => {
      this.scrollbarStyle['opacity'] = 0
      this.updatePosition(y)
    })
  },

  refresh () {
    this.transitionDuration()
    this.calculate()
    this.updatePosition()
  },

  transitionDuration (time = 0) {
    this.indicatorStyle[styleNames['transitionDuration']] = time + 'ms'
  },

  calculate () {
    let scrollbarHeight = this.scrollbarEl.offsetHeight

    this.indicatorHeight = Math.max(Math.round(scrollbarHeight * scrollbarHeight / (this.scroller.scrollEl.offsetHeight || scrollbarHeight || 1)), INDICATOR_MIN_LEN)
    this.maxY = scrollbarHeight - this.indicatorHeight
    this.ratio = this.maxY / (this.scroller.maxScrollY - this.scroller.minScrollY)

    this.indicatorStyle.height = this.indicatorHeight + 'px'
  },

  updatePosition (currentY = this.scroller.y) {
    let y = Math.round(this.ratio * (currentY - this.scroller.minScrollY))

    if (y < 0) {
      this.transitionDuration(this.scroller.bounceDuration)

      const height = Math.max(this.indicatorHeight + y * 3, INDICATOR_MIN_LEN)
      this.indicatorStyle.height = height + 'px'
      y = 0
    } else if (y > this.maxY) {
      this.transitionDuration(this.scroller.bounceDuration)

      const height = Math.max(this.indicatorHeight - (y - this.maxY) * 3, INDICATOR_MIN_LEN)
      this.indicatorStyle.height = height + 'px'
      y = this.maxY + this.indicatorHeight - height
    } else {
      this.transitionDuration()

      this.indicatorStyle.height = this.indicatorHeight + 'px'
    }

    this.y = y

    this.indicatorStyle[styleNames['transform']] = `translateY(${y}px)${this.scroller.translateZ}`
  }
})

export default {
  _createScrollbar () {
    const scrollbarEl = document.createElement('div')
    const indicatorEl = document.createElement('div')

    const metaEl = document.querySelector('meta[name="viewport"]')
    let dpr = 1

    if (metaEl) {
      let match = metaEl.getAttribute('content').match(/initial-scale=([\d.]+)/)
      dpr = parseInt(1 / ((match && match[1]) || 1))
    }

    scrollbarEl.className = '_axe-scrollbar'
    indicatorEl.className = '_axe-indicator'

    scrollbarEl.style.cssText = [
      'position: absolute',
      'top: 2px',
      'bottom: 2px',
      `right: ${2 * dpr}px`,
      `width: ${2 * dpr}px`,
      'z-index: 10000001',
      'opacity: 0',
      'overflow: hidden',
      'pointer-events: none'
    ].join('; ')

    scrollbarEl.style[styleNames['transitionProperty']] = 'opacity'
    scrollbarEl.style[styleNames['transitionTimingFunction']] = 'ease'
    scrollbarEl.style[styleNames['transitionDuration']] = '250ms'

    indicatorEl.style.cssText = [
      // 'box-sizing: border-box',
      // 'position: absolute',
      'width: 100%',
      // 'border: 1px solid rgba(255, 255, 255, 0.9)',
      'border-radius: 10px',
      'background-color: rgba(0, 0, 0, 0.5)'
    ].join('; ')

    scrollbarEl.style[styleNames['transitionProperty']] = 'all'
    indicatorEl.style[styleNames['transitionTimingFunction']] = ease['bounce']
    indicatorEl.style[styleNames['transitionDuration']] = '0ms'

    scrollbarEl.appendChild(indicatorEl)

    this.scrollbar = new Scrollbar(scrollbarEl, indicatorEl, this)

    return scrollbarEl
  }
}
