/**
 * 防抖
 * @param {function} fn
 * @param {number} wait = 100 延迟触发的时间
 * @param {number} maxWait 如果持续操作，超过最大时间后则触发一次
 */
export default function debounce (fn, wait = 100, maxWait) {
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