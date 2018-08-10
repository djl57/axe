import BScroll from '@/common/better-scroll'
import { getPageEl } from '@/resources/render'
import './style.css'

const rootEl = document.getElementById('root')
const appEl = document.getElementById('app')

rootEl.style.height = '100%'

appEl.innerHTML += '<input class="input" type="text" />'

for (let page = 0; page < 3; page++) {
  appEl.appendChild(getPageEl(page))
}

let boxEls = document.querySelectorAll('.box')

for (let index = 0; index < boxEls.length; index++) {
  let el = boxEls[index]
  el.addEventListener('click', () => {
    console.info(index)
  }, false)
}

window.bscroll = new BScroll(rootEl, {
  scrollbar: true,
  probeType: 3,
  click: true
})

// 图片未加载完成时，不会算上其高度，因此图片渲染完成后，滚动的高度比实际小
const imgEls = appEl.querySelectorAll('img')
let loadedImgNum = 0

function loadedImg () {
  loadedImgNum++

  if (loadedImgNum === imgEls.length) {
    window.bscroll.refresh()
  }
}

if (imgEls.length > 0) {
  for (let i = 0; i < imgEls.length; i++) {
    imgEls[i].onload = imgEls[i].onerror = loadedImg
  }
} else {
  window.onload = () => {
    window.bscroll.refresh()
  }
}
