import './reset.css'

const docEl = document.documentElement
const metaEl = document.querySelector('meta[name="viewport"]')

const maxWidth = window.__MAX_WIDTH__ || 750
const divPart = window.__DIV_PART__ || 15
const bodySize = window.__BODY_SIZE__ || 12

let scale = 1
let dpr = 1
let timer = null

if (metaEl) {
  console.warn('根据已有的meta标签来设置缩放比例')

  const match = metaEl.getAttribute('content').match(/initial-scale=([\d.]+)/)

  if (match) {
    scale = parseFloat(match[1])
    dpr = parseInt(1 / scale)
  }
} else {
  const isIPhone = window.navigator.appVersion.match(/iphone/gi)

  if (isIPhone) {
    dpr = parseInt(window.devicePixelRatio) || 1
    scale = 1 / dpr
  }

  const newMetaEl = document.createElement('meta')
  newMetaEl.setAttribute('name', 'viewport')
  newMetaEl.setAttribute('content', `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`)
  docEl.firstElementChild.appendChild(newMetaEl)
}

// 设置根节点dpr
docEl.setAttribute('data-dpr', dpr)

// 窗口宽度改变时，刷新rem
function refreshRem () {
  let width = docEl.getBoundingClientRect().width

  if (width / dpr > maxWidth) {
    width = maxWidth * dpr
  }

  window.remUnit = width / divPart
  docEl.style.fontSize = window.remUnit + 'px'
}

window.addEventListener('resize', function () {
  clearTimeout(timer)
  timer = setTimeout(refreshRem, 300)
}, false)

window.addEventListener('pageshow', function (e) {
  if (e.persisted) {
    refreshRem()
  }
}, false)

document.addEventListener('DOMContentLoaded', function () {
  document.body.style.fontSize = bodySize * dpr + 'px'
}, false)

// 初始化
refreshRem()

// 全局单位转换方法
window.px2rem = function (d) {
  let val = parseFloat(d) / window.remUnit

  if (typeof d === 'string' && d.match(/px$/)) {
    val += 'rem'
  }

  return val
}

window.rem2px = function (d) {
  let val = parseFloat(d) * window.remUnit

  if (typeof d === 'string' && d.match(/rem$/)) {
    val += 'px'
  }

  return val
}