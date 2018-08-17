import Request from './Request'

const instance = new Request()

function request (opt) {
  return instance.request(opt, request.defaults)
}

request.defaults = instance.defaults

export default request
