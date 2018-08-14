import { isUndef } from './util'

const elementStyle = document.createElement('div').style
const transformNames = {
  'standard': 'transform',
  'webkit': 'webkitTransform',
  'Moz': 'MozTransform',
  'O': 'OTransform',
  'ms': 'msTransform'
}
const transitionEnds = {
  'standard': 'transitionend',
  'webkit': 'webkitTransitionEnd',
  'Moz': 'transitionend',
  'O': 'oTransitionEnd',
  'ms': 'MSTransitionEnd'
}

// 浏览器前缀
const vendor = (() => {
  for (let key in transformNames) {
    if (!isUndef(elementStyle[transformNames[key]])) {
      return key
    }
  }

  return 'standard'
})()

// 判断并获取css3属性
export function prefixStyle (style) {
  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

// transition结束事件名
export const transitionend = transitionEnds[vendor]

// 缓存常用的css3属性
export const styleNames = {
  'transform': prefixStyle('transform'),
  // 'transformOrigin': prefixStyle('transformOrigin'),
  'transitionProperty': prefixStyle('transitionProperty'),
  'transitionTimingFunction': prefixStyle('transitionTimingFunction'),
  'transitionDuration': prefixStyle('transitionDuration'),
  // 'transitionDelay': prefixStyle('transitionDelay'),
  'cssTransform': vendor === 'standard' ? 'transform' : `-${vendor.toLowerCase()}-transform`
}

// 是否可以支持gpu渲染
// export const hasPerspective = prefixStyle('perspective') in elementStyle

// 排除需要使用浏览器默认行为的节点
export function preventDefaultException (el, exceptions) {
  for (let key in exceptions) {
    if (exceptions[key].test(el[key])) {
      return true
    }
  }

  return false
}

export function addEvent (el, type, fn, options) {
  el.addEventListener(type, fn, options)
}

export function removeEvent (el, type, fn, options) {
  el.removeEventListener(type, fn, options)
}

export function offsetTop (el) {
  let top = 0

  while (el) {
    top -= el.offsetTop
    el = el.offsetParent
  }

  return top
}

export function scrollFromBody () {
  return {
    top: document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    left: document.documentElement.scrollLeft || window.pageYOffset || document.body.scrollLeft
  }
}

// export function offsetToBody (el) {
//   let rect = el.getBoundingClientRect()
//   let scroll = scrollToBody()

//   return {
//     left: -(rect.left + scroll.left),
//     top: -(rect.top + scroll.top)
//   }
// }

// 创建自定义事件监听
export function createEvent (e, eventName = 'click') {
  let ev
  const bubbles = true
  const cancelable = true

  if (!isUndef(window.MouseEvent)) {
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
