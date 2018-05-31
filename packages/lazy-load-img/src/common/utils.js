/**
 * 截流函数
 * @param {function} fn
 * @param {number} wait = 100 延迟触发的时间
 * @param {boolean} trailing = true 是否启用延迟触发
 */
export function throttle (fn, wait = 100, trailing) {
  let timer = null
  let startTime = 0
  let currTime, remainTime

  return function () {
    currTime = Date.now()
    remainTime = wait - (currTime - startTime)

    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      startTime = currTime
      fn.apply(this, arguments)
    } else if (!timer && trailing !== false) {
      timer = setTimeout(() => {
        timer = null
        startTime = Date.now()
        fn.apply(this, arguments)
      }, remainTime)
    }
  }
}
