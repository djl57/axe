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
  el.addEventListener('click', function (e) {
    console.info(index)
  }, false)
}

const scroller = window.scroller = new Scroller(rootEl, {
  // startY: -20000,
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

// scroller.on('scrollstart', info => {
//   console.info('scrollstart', info)
// })

// scroller.on('scroll', info => {
//   console.info('scroll', info)
// })

// scroller.on('scrollend', info => {
//   console.info('scrollend', info)
// })

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
    scroller.pulltopDone({
      onHide () {
        appEl.querySelector('.top').textContent = '下拉加载'
      }
    })
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
    appEl.appendChild(getPageEl(4))
    appEl.querySelector('.bottom').textContent = '加载完毕'

    scroller.pullbottomDone({
      needLoadImgs: '.img',
      onHide () {
        appEl.querySelector('.bottom').textContent = '上拉加载'
      }
    })
  }, 2000)
})

// rootEl.addEventListener('click', (e) => {
//   console.log(990)
// }, false)
