import { isObject } from './is'

// url编码
export function encodeURL (url) {
  if (window.encodeURIComponent) {
    return window.encodeURIComponent(url)
  }
  return url
}

// url解码
export function decodeURL (url) {
  if (window.decodeURIComponent) {
    return window.decodeURIComponent(url)
  }
  return url
}

/**
 * 获取url中的query参数
 * @param {string} name 参数名
 * @param {string} [url=window.location.search] 路由地址
 * @param {boolean} 配置项 decode: 是否需要将值解码，默认需要解码
 * @returns {string}
 */
export function getQuery (name, url = window.location.search, decode = true) {
  url = url.split('#')[0]
  url = url.substring(url.indexOf('?') + 1)

  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let matched = url.match(reg)
  let value = '' + (matched && matched[2])

  if (value !== 'null' && value !== 'undefined') {
    return decode ? decodeURI(value) : value
  }

  return ''
}

// 对象转换为querystring
export function toQuery (params, encode = true) {
  if (!isObject(params)) return ''

  let query = Object.keys(params).map(name => {
    return name + '=' + params[name]
  }).join('&')

  return encode ? encodeURI(query) : query
}

/**
 * 获取url中的query对象
 * @param {string} [url=window.location.search]
 * @param {array} names 需要获取的参数名
 * @param {boolean} decode: 是否需要将值解码，默认需要解码
 * @returns {object}
 */
export function parseQuery (url = window.location.search, decode = true) {
  url = url.split('#')[0]
  url = url.substring(url.indexOf('?') + 1)
  url = decodeURI(url)

  let params = {}

  url.split('&').forEach(kv => {
    let kvs = kv.split('=')
    params[kvs[0]] = kvs[1]
  })

  return params
}

/**
 * url拼接query参数
 * @param {string} url
 * @param {object} params
 * @param {boolean} encode: 是否需要将值编码，默认需要编码
 * @returns {string}
 */
export function appendQuery (url, params, encode = true) {
  let urls = url.split('#')
  let sign = urls[0].indexOf('?') === -1 ? '?' : '&'
  let query = toQuery(params, encode)

  return urls[0] + (query ? sign + query : '') + (urls[1] || '')
}

// 将字符串url转换为对象格式（和浏览器的location一样）
export function parseURL (url) {
  const a = document.createElement('a')
  a.href = url || ''

  return {
    hash: a.hash,
    host: a.host,
    hostname: a.hostname,
    href: a.href,
    origin: a.origin,
    pathname: a.pathname,
    port: a.port,
    protocol: a.protocol,
    search: a.search
  }
}

// 页面跳转
// type: self, blank, replace
export function redirect (url, params, type) {
  url = appendQuery(url, params)

  if (type === 'replace') {
    window.location.replace(url)
  } else if (type === 'blank') {
    window.open(url)
  } else {
    window.location.href = url
  }
}
