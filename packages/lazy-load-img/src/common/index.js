import { throttle } from './utils'

export default class LazyLoadImg {
  constructor ({
    el, // 查找图片的根节点
    scrollEl = document.documentElement, // 滚动的容器
    lazyOffsetTop = 0,
    placeholderImg,
    onImgLoad,
    cutTime = 100
  }) {
    this.scrollEl = typeof scrollEl !== 'string' ? scrollEl : document.querySelector(scrollEl)
    this.el = typeof el !== 'string' ? el : (scrollEl && scrollEl.querySelector(el))

    this.lazyOffsetTop = lazyOffsetTop
    this.placeholderImg = placeholderImg
    this.onImgLoad = onImgLoad
    this.cutTime = cutTime

    // 需要懒加载的图片
    this.imgList = []
    this.loadedImg = {}

    this.init()
    this._initEvent()
  }

  _initEvent () {
    let realScrollEl = this.scrollEl === document.documentElement ? window : this.scrollEl
    let fn = throttle(() => {
      this.update()
    }, this.cutTime)

    window.addEventListener('resize', fn, false)
    realScrollEl.addEventListener('scroll', fn, false)
  }

  init () {
    if (!this.el) return

    this.imgList = [] // 置空先前存在的图片
    let imgList = this.el.getElementsByTagName('img')

    if (!imgList.length) return

    for (let i = 0, l = imgList.length; i < l; i++) {
      if (imgList[i].getAttribute('data-src')) {
        this.imgList.push(imgList[i])
      }
    }

    if (!this.placeholderImg || this.loadedImg[this.placeholderImg]) {
      this.update()
    } else {
      // 确保占位图已下载完成，以免影响后续对图片的位置影响
      let img = new Image()
      img.src = this.placeholderImg
      img.addEventListener('load', () => {
        this.loadedImg[img.src] = true
        this.update()
      }, false)
    }
  }

  update () {
    if (!this.imgList.length) return

    let remainImgList = []
    let scrollTop = this.scrollEl.scrollTop
    let clientHeight = this.scrollEl.clientHeight

    this.imgList.forEach(img => {
      let isNeedLoad = img.offsetTop < scrollTop + clientHeight + this.lazyOffsetTop
      let lazySrc = img.getAttribute('data-src')

      if (isNeedLoad) {
        if (!this.loadedImg[lazySrc]) {
          let loadImg = new Image()
          loadImg.src = lazySrc
          loadImg.addEventListener('load', () => {
            img.src = lazySrc
            this.loadedImg[lazySrc] = true
            this.onImgLoad && this.onImgLoad(img, loadImg.width, loadImg.height)
          }, false)
        } else {
          // 已经加载过的图片直接赋值
          img.src = lazySrc
        }
      } else {
        remainImgList.push(img)
      }
    })

    // 剩下的图片
    this.imgList = remainImgList
  }
}
