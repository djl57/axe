import mcss from './style.module.css'
import { transform, transition, cssTransform, isElement } from './utils'

export default class Slideshow {
  constructor (options = {}) {
    this.el = typeof options.el !== 'string' ? options.el : document.querySelector(options.el)

    if (!this.el) {
      console.error('[@axe/slideshow] el is null')
      return
    }

    if (!options.list || !options.list.length) {
      console.error('[@axe/slideshow] list is null')
      return
    }

    this.width = this.options.width || this.el.offsetWidth

    this.options = Object.assign({
      initIndex: 0,
      seamless: true,
      limitDistince: this.width / 2,
      limitSpeed: 0.2,
      autoplay: 3000,
      autoloop: false,
      indicator: true,
      indicatorClass: {
        list: mcss.indicator,
        item: mcss.indicatorItem,
        itemActive: mcss.indicatorItemActive
      },
      preventDefault: true,
      transition: {
        duration: 500,
        timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      onchange: null
    }, options)

    this.slideEl = document.createElement('div')
    this.slideEl.className = mcss.slide

    this.children = []

    this.lastIndex = this.options.list.length - 1
    this.currIndex = this.options.initIndex
    this.showIndex = this.options.seamless ? this.currIndex + 1 : this.currIndex

    this.totalX = this.lastIndex * this.width
    this.totalWidth = this.options.list.length * this.width

    this.translateX = 0
    this.transition = [cssTransform, this.options.transition.duration + 'ms', this.options.transition.timingFunction].join(' ')

    this.startTime = 0
    this.startX = 0
    this.pointTime = 0
    this.pointX = 0
    this.speedTime = 0
    this.speedX = 0

    this.timer = null
    this.autoPositive = true

    this._initHtml()
    this._initIndicator()
    this._initEvent()
    this._startAutoplay()
  }

  _initHtml () {
    let list = this.options.list

    if (this.options.seamless) {
      let firstItem = list[0]
      let lastItem = list[list.length - 1]

      if (isElement(firstItem)) {
        firstItem = firstItem.outerHTML
      }

      if (isElement(lastItem)) {
        lastItem = lastItem.outerHTML
      }

      list = [].concat([lastItem], list, [firstItem])
    }

    list.forEach(item => {
      let itemEl = document.createElement('div')
      itemEl.className = mcss.slideItem
      itemEl.style.width = this.width + 'px'

      if (isElement(item)) {
        itemEl.appendChild(item)
      } else if (typeof item === 'string') {
        itemEl.innerHTML = item
      } else if (item && typeof item === 'object') {
        itemEl.innerHTML = `<a href="${item.url || 'javascript:;'}"><img src="${item.img}" alt="" /></a>`
      }

      this.children.push(itemEl)
      this.slideEl.appendChild(itemEl)
    })

    this.slideEl.style.width = (this.width * list.length) + 'px'
    this.changeTranslate(this.width * this.showIndex)
    this.el.appendChild(this.slideEl)
  }

  _initIndicator () {
    if (this.options.indicator) {
      let indicatorClass = this.options.indicatorClass

      this.indicatorEl = document.createElement('ul')
      this.indicatorEl.className = indicatorClass.list

      this.indicatorChildren = []

      for (let i = 0; i <= this.lastIndex; i++) {
        let liEl = document.createElement('li')
        liEl.className = indicatorClass.item

        if (this.currIndex === i) {
          liEl.className += ' ' + indicatorClass.itemActive
        }

        this.indicatorChildren.push(liEl)
        this.indicatorEl.appendChild(liEl)
      }

      this.el.appendChild(this.indicatorEl)
    }
  }

  _initEvent () {
    this.el.addEventListener('touchstart', e => {
      clearTimeout(this.timer)

      let point = e.targetTouches[0]

      this.startX = this.pointX = this.speedX = point.pageX
      this.startTime = this.pointTime = this.speedTime = Date.now()
    }, false)

    this.el.addEventListener('touchmove', e => {
      this.options.preventDefault && e.preventDefault()

      let point = e.targetTouches[0]
      let x = this.translateX + this.pointX - point.pageX

      if (!this.options.seamless) {
        if (x < 0) {
          x = 0
        } else if (x > this.totalX) {
          x = this.totalX
        }
      }

      this.changeTranslate(x)

      this.pointX = point.pageX
      this.pointTime = Date.now()

      if (this.pointTime - this.speedTime > 200) {
        this.speedX = this.pointX
        this.speedTime = this.pointTime
      }
    }, false)

    this.el.addEventListener('touchend', e => {
      let point = e.changedTouches[0]
      let distinceX = point.pageX - this.startX
      let deltaX = point.pageX - this.speedX

      if (Math.abs(distinceX) > this.options.limitDistince) {
        this.changeIndex(distinceX > 0 ? -1 : 1)
      } else if (Math.abs(deltaX) / (Date.now() - this.speedTime) > this.options.limitSpeed) {
        this.changeIndex(deltaX > 0 ? -1 : 1)
      } else {
        this.changeIndex(0)
      }

      this._startAutoplay()
    }, false)
  }

  _startAutoplay () {
    if (this.options.autoplay > 0) {
      this.timer = setTimeout(() => {
        this.changeIndex(this.autoPositive ? 1 : -1, true)
        this._startAutoplay()
      }, this.options.autoplay)
    }
  }

  changeTranslate (x, isTransition) {
    this.translateX = x

    this.slideEl.style[transition] = isTransition ? this.transition : ''
    this.slideEl.style[transform] = `translateX(-${x}px)`
  }

  changeIndex (n, isAuto) {
    let prevIndex = this.currIndex

    this.currIndex += n

    if (this.currIndex > this.lastIndex || this.currIndex < 0) {
      if (!isAuto && !this.options.seamless) {
        this.currIndex = prevIndex
        return
      }

      if (isAuto && this.options.autoloop) {
        this.autoPositive = !this.autoPositive
        this.currIndex = prevIndex + (this.currIndex < 0 ? 1 : -1)
        this.showIndex = this.options.seamless ? this.currIndex + 1 : this.currIndex
        this.changeTranslate(this.width * this.showIndex, true)
        return
      }

      if (this.currIndex < 0) {
        this.currIndex = this.lastIndex
        this.changeTranslate(this.translateX + this.totalWidth)
      } else {
        this.currIndex = 0
        this.changeTranslate(this.translateX - this.totalWidth)
      }

      this.showIndex = this.options.seamless ? this.currIndex + 1 : this.currIndex
      setTimeout(() => {
        this.changeTranslate(this.width * this.showIndex, true)
      }, 50)
    } else {
      this.showIndex = this.options.seamless ? this.currIndex + 1 : this.currIndex
      this.changeTranslate(this.width * this.showIndex, true)
    }

    if (n !== 0) {
      if (this.indicatorChildren) {
        this.indicatorChildren[prevIndex].className = this.options.indicatorClass.item
        this.indicatorChildren[this.currIndex].className += ' ' + this.options.indicatorClass.itemActive
      }

      if (typeof this.options.onchange === 'function') {
        this.options.onchange(this.currIndex)
      }
    }
  }
}
