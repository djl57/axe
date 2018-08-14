import Scroller from '@/common'
import { getPageEl } from '@/resources/render'
import './style.css'

// document.body.innerHTML = [
// ].join('') + document.body.innerHTML

const rootEl = document.getElementById('root')
const appEl = document.getElementById('app')

rootEl.style.height = '100%'
rootEl.style.overflow = 'hidden'

appEl.innerHTML += [
  // '<div style="position:relative;top:-50px;z-index:-1;width:100%;height:600px;"><img class="cover" src="https://goss.veer.com/creative/vcg/veer/1600water/veer-300432261.jpg" alt=""/></div>'
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

// boxEls[0].innerHTML += '<input type="checkbox" style="width:60px;height:60px;" />'

for (let index = 0; index < boxEls.length; index++) {
  let el = boxEls[index]
  el.addEventListener('click', function (e) {
    console.info(index)
  }, false)
}

const scroller = window.scroller = new Scroller(rootEl, {
  // startY: -200,
  // bounce: false,
  // bounceLimitDistance: 200,
  pulltopLimitDistance: window.rem2px(2),
  pullbottomLimitDistance: window.rem2px(2)
})

scroller.on('touchstart', info => {
  console.info('touchstart', info)
})

scroller.on('touchmove', info => {
  console.info('touchmove', info)
})

scroller.on('touchend', info => {
  console.info('touchend', info)
})

scroller.on('scrollstart', info => {
  console.info('scrollstart', info)
})

// let itemEl = document.querySelector('.cover')
// let height = 500

scroller.on('scroll', info => {
  console.info('scroll', info)

  // if (info.y > 0) {
  //   let deltaScale = 1 / itemEl.offsetHeight * info.y * 2

  //   // itemEl.parentElement.style.height = (500 + info.y) + 'px'
  //   // itemEl.parentElement.style.transform = `translateY(${-info.y}px)`
  //   itemEl.style.transform = `scale(${1 + deltaScale})`
  // }
})

scroller.on('scrollend', info => {
  console.info('scrollend', info)

  // itemEl.parentElement.style.height = 500 + 'px'
  // itemEl.style.transform = `scale(1)`
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
