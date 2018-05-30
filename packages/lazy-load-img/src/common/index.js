import { throttle } from './utils'

class LazyLoadImg {
  constructor ({
    el,
    scrollEl = document.documentElement,
    lazyOffsetTop = 0,
    maxInterval = 1000,
    placeholderImg,
    onImgLoad
  }) {
    this.scrollEl = typeof scrollEl !== 'string' ? scrollEl : document.querySelector(scrollEl)
    this.node = typeof el !== 'string' ? el : (scrollEl && scrollEl.querySelector(el))

    this.lazyOffsetTop = lazyOffsetTop
    this.maxInterval = maxInterval
    this.placeholderImg = placeholderImg
    this.onImgLoad = onImgLoad

    this.init()
    this._initEvent()
  }

  _initEvent () {
    const throttleFn = throttle(() => {
      this.update()
    }, 100, this.maxInterval)

    window.addEventListener('resize', throttleFn, false)
    // window.addEventListener('orientationchange', throttleFn, false)
    this.scrollEl.addEventListener('scroll', throttleFn, false)
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

    if (!this.placeholderImg) {
      this.update()
    } else {
      // 确保占位图已下载完成，以免影响后续对图片的位置影响
      let img = new Image()
      img.src = this.placeholderImg
      img.addEventListener('load', () => {
        this.update()
      }, false)
    }
  }

  update () {
    if (!this.imgList.length) return

    let scrollTop = this.scrollEl.scrollTop
    let clientHeight = this.scrollEl.clientHeight

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
