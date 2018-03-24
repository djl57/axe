import jsonp from './jsonp'
import Request from './Request'

const instance = new Request()
const request = instance.request.bind(instance)
request.defaults = instance.defaults

export {
  Request,
  jsonp
}

export default request
