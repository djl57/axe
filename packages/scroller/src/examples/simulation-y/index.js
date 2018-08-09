import FMover from 'finger-mover'
import simulationScrollY from 'simulation-scroll-y'
import { getPageEl } from '@/resources/render'
import './style.css'

const rootEl = document.getElementById('root')
const appEl = document.getElementById('app')

rootEl.style.height = '100%'

for (let page = 0; page < 3; page++) {
  appEl.appendChild(getPageEl(page))
}

window.fmover = new FMover({
  el: appEl,
  plugins: [
    simulationScrollY()
  ]
})

// 图片未加载完成时，不会算上其高度，因此图片渲染完成后，滚动的高度比实际小
const imgEls = appEl.querySelectorAll('img')
let loadedImgNum = 0

function loadedImg () {
  loadedImgNum++

  if (loadedImgNum === imgEls.length) {
    window.fmover[0].refreshSize()
  }
}

for (let i = 0; i < imgEls.length; i++) {
  imgEls[i].onload = imgEls[i].onerror = loadedImg
}
