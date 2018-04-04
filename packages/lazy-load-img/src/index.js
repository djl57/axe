import { throttle } from './utils'

const docEl = document.documentElement
const bodyEl = document.body
const clientHeight = docEl.clientHeight

class LazyLoadImg {
  constructor ({
    el,
    lazyOffsetTop = 0,
    maxInterval = 1000,
    onImgLoad
  }) {
    if (typeof el !== 'string') {
      this.node = el
    } else {
      this.node = document.querySelector(el)
    }

    this.lazyOffsetTop = lazyOffsetTop
    this.maxInterval = maxInterval
    this.onImgLoad = onImgLoad

    this.init()
    this._initEvent()
  }

  _initEvent () {
    const throttleFn = throttle(() => {
      this.update()
    }, 100, this.maxInterval)

    window.addEventListener('scroll', throttleFn, false)
    window.addEventListener('resize', throttleFn, false)
    window.addEventListener('orientationchange', throttleFn, false)
  }

  init () {
    if (!this.node) return

    this.imgList = []

    let imgList = this.node.getElementsByTagName('img')

    if (!imgList.length) return

    for (let i = 0, l = imgList.length; i < l; i++) {
      if (imgList[i].getAttribute('data-src')) {
        this.imgList.push(imgList[i])
      }
    }

    this.update()
  }

  update () {
    let scrollTop = docEl.scrollTop || bodyEl.scrollTop || this.node.scrollTop

    this.imgList = this.imgList.filter(img => {
      let isNeedLoad = img.offsetTop < scrollTop + clientHeight + this.lazyOffsetTop

      if (isNeedLoad) {
        let loadImg = new Image()
        loadImg.src = img.getAttribute('data-src')
        loadImg.addEventListener('load', () => {
          img.src = loadImg.src
          this.onImgLoad && this.onImgLoad(img, loadImg.width, loadImg.height)
        }, false)
      }

      return !isNeedLoad
    })
  }
}

export default function lazyLoadImg (node) {
  return new LazyLoadImg(node)
}