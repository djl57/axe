/**
 * 截流函数
 * @param {function} fn
 * @param {number} wait = 100 延迟触发的时间
 * @param {number} maxWait 超过限制时间则主动触发一次
 */
export function throttle (fn, wait = 100, maxWait) {
  let startTime = new Date()
  let timer, currTime

  return function () {
    clearTimeout(timer)
    currTime = new Date()

    if (!maxWait || (currTime - startTime < maxWait)) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        startTime = currTime
      }, wait)
    } else {
      fn.apply(this, arguments)
      startTime = currTime
    }
  }
}