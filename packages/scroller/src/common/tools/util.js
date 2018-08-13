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

// 是否为函数
export function isFunc (fn) {
  return typeof fn === 'function'
}

// 是否为数组
export function isArray (a) {
  if (Array.isArray) {
    return Array.isArray(a)
  }

  return Object.prototype.toString.call(a) === '[object Array]'
}

// 是否为字符串
export function isString (s) {
  return typeof s === 'string'
}

// 是否为数字
export function isNumber (n) {
  return typeof n === 'number'
}
