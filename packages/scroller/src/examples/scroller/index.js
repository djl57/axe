import Scroller from '@/common'
import { getPageEl } from '@/resources/render'
import './style.css'

const rootEl = document.getElementById('root')
const appEl = document.getElementById('app')

rootEl.style.height = '100%'

appEl.innerHTML += [
  '<input class="input" type="text" />',
  '<a href="/aa">这是超链接</a>'
].join('')

for (let page = 0; page < 1; page++) {
  appEl.appendChild(getPageEl(page))
}

appEl.innerHTML += [
  '<div class="top">下拉加载</div>',
  '<div class="bottom">上拉加载</div>'
].join('')

let boxEls = document.querySelectorAll('.box')

boxEls[0].innerHTML += '<input type="checkbox" style="width:60px;height:60px;" />'

for (let index = 0; index < boxEls.length; index++) {
  let el = boxEls[index]
  el.addEventListener('click', () => {
    console.info(index)
  }, false)
}

const scroller = window.scroller = new Scroller(rootEl, {
  // bounce: false
  // bounceLimitDistance: 200
  pulltopLimitDistance: window.rem2px(2),
  pullbottomLimitDistance: window.rem2px(2)
})

// scroller.on('touchstart', info => {
//   console.info('touchstart', info)
// })

// scroller.on('touchmove', info => {
//   console.info('touchmove', info)
// })

// scroller.on('touchend', info => {
//   console.info('touchend', info)
// })

scroller.on('scrollstart', info => {
  console.info('scrollstart', info)
})

scroller.on('scroll', info => {
  console.info('scroll', info)
})

scroller.on('scrollend', info => {
  console.info('scrollend', info)

  appEl.querySelector('.top').textContent = '下拉加载'
  appEl.querySelector('.bottom').textContent = '上拉加载'
})

scroller.on('pulltopstart', () => {
  console.info('pulltopstart')
  appEl.querySelector('.top').textContent = '松开加载'
})

scroller.on('pulltopcancel', () => {
  console.info('pulltopcancel')
  appEl.querySelector('.top').textContent = '下拉加载'
})

scroller.on('pulltop', () => {
  console.info('pulltop')
  appEl.querySelector('.top').textContent = '加载中'

  setTimeout(() => {
    appEl.querySelector('.top').textContent = '加载完毕'
    scroller.pulltopDone(true)
  }, 2000)
})

scroller.on('pullbottomstart', () => {
  console.info('pullbottomstart')
  appEl.querySelector('.bottom').textContent = '松开加载'
})

scroller.on('pullbottomcancel', () => {
  console.info('pullbottomcancel')
  appEl.querySelector('.bottom').textContent = '上拉加载'
})

scroller.on('pullbottom', () => {
  console.info('pullbottom')
  appEl.querySelector('.bottom').textContent = '加载中'

  setTimeout(() => {
    appEl.querySelector('.bottom').textContent = '加载完毕'
    scroller.pullbottomDone(false)
  }, 2000)
})

// 图片未加载完成时，不会算上其高度，因此图片渲染完成后，滚动的高度比实际小
const imgEls = appEl.querySelectorAll('img')
let loadedImgNum = 0

function loadedImg () {
  loadedImgNum++

  if (loadedImgNum === imgEls.length) {
    window.scroller.refresh()
  }
}

if (imgEls.length > 0) {
  for (let i = 0; i < imgEls.length; i++) {
    imgEls[i].onload = imgEls[i].onerror = loadedImg
  }
} else {
  window.onload = () => {
    window.scroller.refresh()
  }
}
