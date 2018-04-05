/**
 * 截流函数
 * @param {function} fn
 * @param {number} wait = 100 延迟触发的时间
 * @param {boolean} trailing 结束时是否触发一次
 */
export default function throttle (fn, wait = 100, trailing) {
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