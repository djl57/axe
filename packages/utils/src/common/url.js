import { isObject } from './is'

// url编码
export function encodeUrl (url) {
  if (window.encodeURIComponent) {
    return window.encodeURIComponent(url)
  }

  return url
}

// url解码
export function decodeUrl (url) {
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
export function getQueryString (name, url = window.location.search, decode = false) {
  url = url.split('#')[0]
  url = url.substring(url.indexOf('?') + 1)

  let matched = url.match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'))
  let value = '' + (matched && matched[2])

  if (value !== 'null' && value !== 'undefined') {
    return !decode ? value : decodeUrl(value)
  }

  return ''
}

// 对象转换为querystring
export function toQueryString (params, encode = false) {
  if (!isObject(params)) {
    return params
  }

  return Object.keys(params).map(name => {
    return name + '=' + (!encode ? params[name] : encodeUrl(params[name]))
  }).join('&')
}

/**
 * 获取url中的query对象
 * @param {string} [url=window.location.search]
 * @param {array} names 需要获取的参数名
 * @param {boolean} decode: 是否需要将值解码，默认需要解码
 * @returns {object}
 */
export function parseQueryString (url = window.location.search, decode = false) {
  url = url.split('#')[0]
  url = url.substring(url.indexOf('?') + 1)

  let params = {}
  let arr

  url.split('&').forEach(kv => {
    arr = kv.split('=')
    params[arr[0]] = !decode ? arr[1] : decodeUrl(arr[1])
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
export function formatUrl (url, params, encode = false) {
  let urls = url.split('#')
  let sign = urls[0].indexOf('?') === -1 ? '?' : '&'
  let query = toQueryString(params, encode)

  return urls[0] + (query ? sign + query : '') + (urls[1] || '')
}

// 将字符串url转换为对象格式（和浏览器的location一样）
export function parseUrl (url) {
  let a = document.createElement('a')
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
export function redirect (url, params, options = {}) {
  url = formatUrl(url, params, options.encode)

  if (!options.type) {
    window.location.href = url
  } else {
    if (options.type === 'replace') {
      window.location.replace(url)
    } else if (options.type === 'blank') {
      window.open(url)
    } else {
      window.location.href = url
    }
  }
}
