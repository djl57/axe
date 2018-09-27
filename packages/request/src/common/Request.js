import { isObject, isFunction, isFormData, isValid, param2query, appendQuery, parseJSON } from './utils'
import originDefaults from './defaults'
import jsonp from './jsonp'

export default class Request {
  constructor (props) {
    this.defaults = Object.assign({}, originDefaults, props)
  }

  request (opts = {}, defaults = this.defaults) {
    if (isFunction(opts.beforeRequest)) {
      opts.beforeRequest(opts)
    } else if (isFunction(defaults.beforeRequest)) {
      defaults.beforeRequest(opts)
    }

    // 取消请求
    if (opts._abort) {
      return new Promise(() => {})
    }

    if (isObject(opts.inlineData)) {
      Object.keys(opts.inlineData).forEach(key => {
        opts.url = opts.url.replace(`:{${key}}`, opts.inlineData[key])
      })
    }

    if (defaults.baseURL && opts.url[0] === '/' && opts.url[1] !== '/') {
      opts.url = defaults.baseURL.replace(/\/$/, '') + opts.url
    }

    opts.method = (opts.method || 'get').toUpperCase()
    opts.headers = Object.assign({}, defaults.headers, opts.headers)

    if (opts.method === 'JSONP') {
      return jsonp(opts, defaults)
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      let body = null

      xhr.open(opts.method, appendQuery(opts.url, opts.params), true)

      if (opts.method === 'POST') {
        if (!isFormData(opts.data)) {
          if (isObject(opts.data)) {
            if (opts.dataType === 'json') {
              opts.headers['Content-Type'] = 'application/json; charset=utf-8'
            }
            body = param2query(opts.data)
          } else {
            if (opts.dataType === 'text') {
              opts.headers['Content-Type'] = 'text/plain; charset=utf-8'
            }
            body = opts.data
          }
        } else {
          opts.headers['Content-Type'] = null
          body = opts.data
        }
      }

      if (isFunction(xhr.setRequestHeader)) {
        Object.keys(opts.headers).forEach(key => {
          if (!isValid(opts.headers[key])) return
          xhr.setRequestHeader(key, opts.headers[key])
        })
      }

      if (opts.credentials) {
        xhr.withCredentials = true
      }

      xhr.timeout = opts.timeout || 0

      xhr.onload =
      xhr.onerror =
      xhr.ontimeout = function (e) {
        let res = {
          type: e.type,
          status: xhr.status,
          statusText: xhr.statusText,
          response: parseJSON(xhr.responseText)
        }

        if (isFunction(opts.afterResponse)) {
          opts.afterResponse(res)
        } else if (isFunction(defaults.afterResponse)) {
          defaults.afterResponse(res)
        }

        if (res.status >= 200 && res.status < 300) {
          resolve(res.response)
        } else {
          reject(res)
        }
      }

      xhr.send(body)
    })
  }
}
