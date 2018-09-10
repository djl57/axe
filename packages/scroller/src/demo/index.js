import Scroller from '@/common'
import './style.css'

const rootEl = document.getElementById('root')
const appEl = document.getElementById('app')

rootEl.style.height = '100%'
rootEl.style.overflow = 'hidden'

appEl.innerHTML += [
  '<div class="top">下拉加载</div>',
  '<div class="bottom">上拉加载</div>'
].join('')

function getPageEl (page, pageSize = 10) {
  const divEl = document.createElement('div')
  divEl.className = 'page'

  const start = page * pageSize
  const end = (page + 1) * pageSize
  let html = ''

  for (let i = start; i < end; i++) {
    html += `
      <div class="box">
        <div class="block">${i}</div>
      </div>
    `
  }

  divEl.innerHTML = html

  return divEl
}

for (let page = 0; page < 3; page++) {
  appEl.appendChild(getPageEl(page))
}

let boxEls = document.querySelectorAll('.box')

for (let index = 0; index < boxEls.length; index++) {
  let el = boxEls[index]
  el.addEventListener('click', function (e) {
    console.info(index)
  }, false)
}

const scroller = window.scroller = new Scroller(rootEl, {
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

scroller.on('scroll', info => {
  console.info('scroll', info)
})

scroller.on('scrollend', info => {
  console.info('scrollend', info)
})

const topEl = appEl.querySelector('.top')
const bottomEl = appEl.querySelector('.bottom')

scroller.on('pulltopstart', () => {
  console.info('pulltopstart')
  topEl.textContent = '松开加载'
})

scroller.on('pulltopcancel', () => {
  console.info('pulltopcancel')
  topEl.textContent = '下拉加载'
})

scroller.on('pulltop', () => {
  console.info('pulltop')
  topEl.textContent = '加载中'

  setTimeout(() => {
    topEl.textContent = '加载完毕'
    scroller.pulltopDone({
      onHide () {
        topEl.textContent = '下拉加载'
      }
    })
  }, 2000)
})

scroller.on('pullbottomstart', () => {
  console.info('pullbottomstart')
  bottomEl.textContent = '松开加载'
})

scroller.on('pullbottomcancel', () => {
  console.info('pullbottomcancel')
  bottomEl.textContent = '上拉加载'
})

scroller.on('pullbottom', () => {
  console.info('pullbottom')
  bottomEl.textContent = '加载中'

  setTimeout(() => {
    appEl.appendChild(getPageEl(4))
    bottomEl.textContent = '加载完毕'

    scroller.pullbottomDone({
      needLoadImgs: '.img',
      onHide () {
        bottomEl.textContent = '上拉加载'
      }
    })
  }, 2000)
})
