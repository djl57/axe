import lazyLoadImg from '@/common'
import './style.css'

const lazy = lazyLoadImg({
  el: '#root',
  lazyOffsetTop: 500,
  maxInterval: 1000,
  placeholderImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg'
  // onImgLoad (img, w, h) {}
})

console.info(lazy)

// when new img is append, query img again.
// lazy.init()

// trigger img render by yourself
// lazy.update()
