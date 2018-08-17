import { isObject } from './is'
import { parseDate } from './date'
import { parseJSON } from './data'

// 获取cookie
export function getCookie (name) {
  let matched = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  return matched ? (window.unescape ? window.unescape(matched[2]) : matched[2]) : ''
}

// 设置cookie
// options:
// expires=Fri, 31 Dec 2017 15:59:59 GMT，cookie过期的日期，如果没有定义，cookie会在对话结束时过期。日期格式为 new Date().toGMTString()
// path=/mydir: path=path (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径。
// domain=cnblogs.com： 指定域(例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com') 如果没有定义，默认为当前文档位置的路径的域名部分。
// max-age=3600： 文档被查看后cookie过期时间，单位为秒
// secure=true： cookie只会被https传输 ，即加密的https链接传输
export function setCookie (name, value, options = {}) {
  let str = ''

  for (let key in options) {
    str += ';' + key + '=' + (key !== 'expires' ? options[key] : parseDate(options[key]).toGMTString())
  }

  document.cookie = name + '=' + (window.escape ? window.escape(value) : value) + str
}

// 删除cookie
export function removeCookie (name) {
  setCookie(name, ' ', {
    expires: Date.now() - 1
  })
}

// 获取localStorage
export function getStorage (key, type) {
  if (!window.localStorage) return

  let data = window.localStorage.getItem(key)

  if (type === 'Object') {
    data = parseJSON(data)
  } else if (type === 'Boolean') {
    data = type === 'true'
  } else if (type === 'Number') {
    data = +data
  }

  return data
}

// 设置localStorage
export function setStorage (key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(key, !isObject(value) ? value : JSON.stringify(value))
  }
}

// 删除localStorage
export function removeStorage (key) {
  if (window.localStorage) {
    window.localStorage.removeItem(key)
  }
}
