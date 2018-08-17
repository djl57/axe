// 获取节点
export function getElement (el, parent = document) {
  if (typeof el === 'string') {
    return parent.querySelector(el)
  }

  return el
}

// 获取节点列表
export function getElementList (els, parent = document) {
  if (typeof el === 'string') {
    return parent.querySelectorAll(els)
  }

  return els
}

// 创建自定义事件监听
export function createEvent (eventName = 'click') {
  let ev
  const bubbles = true
  const cancelable = true

  if (window.MouseEvent) {
    try {
      ev = new window.MouseEvent(eventName, {
        bubbles,
        cancelable
      })
      ev._mouseEvent = true // 标识mouseEvent
    } catch (err) {
      ev = document.createEvent('Event')
      ev.initEvent(eventName, bubbles, cancelable)
    }
  } else {
    ev = document.createEvent('Event')
    ev.initEvent(eventName, bubbles, cancelable)
  }

  // forwardedTouchEvent set to true in case of the conflict with fastclick
  ev.forwardedTouchEvent = true
  ev._constructed = true

  return ev
}

// 主动触发事件
export function dispatchEvent (e, ev) {
  if (!ev._mouseEvent) {
    ev.pageX = e.pageX
    ev.pageY = e.pageY
  }

  e.target.dispatchEvent(ev)
}

// 获取节点基于当前视窗的偏移位置
export function getOffsetFromDoc (el) {
  el = getElement(el)

  let top = 0
  let left = 0

  while (el) {
    top += el.offsetTop
    left += el.offsetLeft

    el = el.offsetParent
  }

  return {
    top,
    left
  }
}

// 获取节点基于当前视窗的滚动位置
export function getScrollFromDoc () {
  return {
    top: document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    left: document.documentElement.scrollLeft || window.pageYOffset || document.body.scrollLeft
  }
}
