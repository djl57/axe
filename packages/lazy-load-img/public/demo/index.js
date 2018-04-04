import lazyLoadImg from '@'
import './style.css'

const clientWidth = document.documentElement.clientWidth

const lazy = lazyLoadImg({
  el: '#root',
  lazyOffsetTop: 500,
  maxInterval: 1000,
  onImgLoad (img, w, h) {
    img.style.width = clientWidth + 'px'
    img.style.height = (clientWidth * h / w) + 'px'
  }
})

// when new img is append, query img again.
lazy.init()

// trigger img render by yourself
lazy.update()