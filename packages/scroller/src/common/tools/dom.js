import { isUndef } from './util'

const style = document.createElement('div').style
const vendors = {
  webkit: 'Webkit',
  moz: 'Moz',
  o: 'O',
  ms: 'ms'
}
const eventVendors = {
  webkit: 'webkit',
  moz: '',
  o: 'o',
  ms: 'MS'
}

function getVendorName (name) {
  if (name in style) {
    return ''
  }

  let upperName = name[0].toUpperCase() + name.substr(1)

  for (let key in vendors) {
    if ((vendors[key] + upperName) in style) {
      return key
    }
  }

  return ''
}

// 判断是否需要前缀并获取style名称
function getStyleName (name) {
  let vendor = getVendorName(name)
  return !vendor ? name : vendor + name[0].toUpperCase() + name.substr(1)
}

// 判断是否需要前缀并获取css名称
function getCssName (name) {
  let vendor = getVendorName(name)
  let cssName = name.replace(/[A-Z]/g, s => '-' + s.toLowerCase())
  return !vendor ? cssName : '-' + vendor + '-' + cssName
}

// 判断是否需要前缀并获取event名称，如：transitionend、animationend等
export function getEventName (name) {
  let key

  if (name.indexOf('transition') === 0) {
    key = 'transition'
  } else if (name.indexOf('animation') === 0) {
    key = 'animation'
  }

  if (!key) {
    return name
  }

  let vendor = eventVendors[getVendorName(key)]

  if (!vendor) {
    return name
  } else {
    let suffixName = name.substr(key.length)
    return vendor + key[0].toUpperCase() + key.substr(1) + suffixName[0].toUpperCase() + suffixName.substr(1)
  }
}

// transition结束事件名
export const transitionend = getEventName('transitionend')

// 缓存常用的css3属性
export const styleNames = {
  'transform': getStyleName('transform'),
  // 'transformOrigin': getStyleName('transformOrigin'),
  'transitionProperty': getStyleName('transitionProperty'),
  'transitionTimingFunction': getStyleName('transitionTimingFunction'),
  'transitionDuration': getStyleName('transitionDuration'),
  // 'transitionDelay': getStyleName('transitionDelay'),
  'cssTransform': getCssName('transform')
}

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
