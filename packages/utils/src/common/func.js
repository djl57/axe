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

// fn返回值为true，则循环执行animation
export function loopAF (fn, runAtStart) {
  if (!runAtStart) {
    requestAF(() => {
      if (fn()) {
        loopAF(fn)
      }
    })
  } else {
    if (fn()) {
      loopAF(fn)
    }
  }
}

/**
 * 防抖
 * @param {function} fn
 * @param {number} wait = 100 延迟触发的时间
 * @param {number} maxWait 如果持续操作，超过最大时间后则触发一次
 */
export function debounce (fn, wait = 100, maxWait) {
  let timer = null
  let startTime = Date.now()
  let currTime

  return function () {
    clearTimeout(timer)
    currTime = Date.now()

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

// 复制，兼容性不太好，建议在chrome中使用
export function copy (text) {
  let el = document.createElement('input')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  el.remove()
}
