export function addZero (d) {
  d = '' + d

  if (d.length === 1) {
    return '0' + d
  }

  return d
}

/**
 * 防抖
 * @param {function} fn
 * @param {number} wait = 100 延迟触发的时间
 * @param {number} maxWait 如果持续操作，超过最大时间后则触发一次
 */
export function debounce (fn, wait = 100, maxWait) {
  let timer = null
  let startTime = new Date()
  let currTime

  return function () {
    clearTimeout(timer)
    currTime = new Date()

    if (maxWait && (currTime - startTime >= maxWait)) {
      fn.apply(this, arguments)
      startTime = currTime
      return
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments)
      startTime = currTime
    }, wait)
  }
}

/**
 * 截流函数
 * @param {function} fn
 * @param {number} wait = 100 延迟触发的时间
 * @param {boolean} trailing 结束时是否触发一次
 */
export function throttle (fn, wait = 100, trailing) {
  let timer = null

  return function () {
    if (timer) return

    fn.apply(this, arguments)

    timer = setTimeout(() => {
      trailing && fn.apply(this, arguments)
      timer = null
    }, wait)
  }
}

// 复制
export function copy (text) {
  let el = document.createElement('input')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  el.remove()
}
