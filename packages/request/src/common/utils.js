// export function isArray (a) {
//   if (Array.isArray) {
//     return Array.isArray(a)
//   }
//   return Object.prototype.toString.call(a) === '[object Array]'
// }

export function isObject (o) {
  return o && typeof o === 'object'
}

export function isFunction (fn) {
  return typeof fn === 'function'
}

export function isString (s) {
  return typeof s === 'string'
}

export function isValid (v) {
  return v != null
}

export function isFormData (data) {
  return window.FormData && data instanceof window.FormData
}

export function param2query (params) {
  if (!isObject(params)) return ''

  return Object.keys(params).map(name => {
    let value = ''
    if (isObject(params[name])) {
      value = JSON.stringify(params[name])
    } else if (isValid(params[name])) {
      value = params[name]
    }
    return name + '=' + value
  }).join('&')
}

export function appendQuery (url, data) {
  let urls = url.split('#')
  let sign = urls[0].indexOf('?') === -1 ? '?' : '&'
  let query = isObject(data) ? param2query(data) : data

  return urls[0] + (query ? sign + query : '') + (urls[1] || '')
}

export function parseJSON (json) {
  if (isString(json)) {
    try {
      json = JSON.parse(json)
    } catch (err) {}
  }
  return json
}
