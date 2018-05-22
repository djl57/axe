import { isObject, isFunction, appendQuery, parseJSON } from './utils'
import originDefaults from './defaults'

export default function jsonp (opts, defaults) {
  if (!isObject(defaults)) {
    defaults = Object.assign({}, originDefaults)
  }

  return new Promise((resolve, reject) => {
    const callbackName = defaults.jsonpPrefix + (+new Date())
    let response
    let script
    let src
    let abort = false

    window[callbackName] = function (res) {
      delete window[callbackName]
      document.body.removeChild(script)

      response = parseJSON(res)
    }

    if (isObject(opts.params)) {
      opts.params[defaults.jsonpCallback] = callbackName
      src = appendQuery(opts.url, opts.params)
    } else {
      let query = (opts.params ? opts.params + '&' : '') + defaults.jsonpCallback + '=' + callbackName
      src = opts.url + (opts.url.indexOf('?') === -1 ? '?' : '&') + query
    }

    script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.onload =
    script.onerror = function (e) {
      // 超时了
      if (abort) return

      let res = {
        type: e.type,
        status: e.type === 'load' ? 200 : 500,
        statusText: e.type === 'load' ? 'ok' : 'fail',
        response
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

    document.body.appendChild(script)

    if (opts.timeout) {
      setTimeout(() => {
        abort = true

        let res = {
          type: 'timeout',
          status: 500,
          statusText: 'fail',
          response
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
      }, opts.timeout)
    }
  })
}
