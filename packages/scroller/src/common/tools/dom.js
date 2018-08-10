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
  'transitionDuration': prefixStyle('transitionDuration')
  // 'transitionDelay': prefixStyle('transitionDelay')
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

export function createEvent (e, eventName, bubbles = true, cancelable = true) {
  const ev = document.createEvent('Event')
  ev.initEvent(eventName, bubbles, cancelable)

  ev.pageX = e.pageX
  ev.pageY = e.pageY

  // forwardedTouchEvent set to true in case of the conflict with fastclick
  ev.forwardedTouchEvent = true
  ev._constructed = true

  return ev
}

export function dispatchEvent (e, eventName = 'click') {
  const ev = createEvent(e, eventName)
  e.target.dispatchEvent(ev)
}
