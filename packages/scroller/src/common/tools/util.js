export const requestAF = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  (cb => setTimeout(cb, 1000 / 60))

export const cancelAF = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  (id => clearTimeout(id))

// 警告
export function warn (msg) {
  console.error(`[Scroller warn]: ${msg}`)
}

// 获取当前时间戳
export function getNow () {
  return Date.now()
}

// 变量是否定义
export function isUndef (v) {
  return typeof v === 'undefined'
}
