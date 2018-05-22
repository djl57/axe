# request

[![version](https://img.shields.io/npm/v/@axe/request.svg)](https://www.npmjs.org/package/@axe/request)

a micro javascript library for request data.

## Installation

```console
npm install @axe/request
```

## Usage

```js
import request from '@axe/request'

// import { Request, jsonp } from '@axe/request'

// const apiInstance = new Request({
//   baseURL = '/api'
// })

// same to request
// apiInstance.request

// request.defaults.baseURL = 'http://localhost:5000'
// request.defaults.beforeRequest = function (req) {
//   req.url += '/fdsa'
// }
// request.defaults.afterResponse = function (res) {
//   res.status = 0
// }

// get
request({
  method: 'get',
  url: 'https://www.easy-mock.com/mock/5ab628fd72286c70d351bcf9/example/query',
  params: {
    id: 1,
    name: 'name'
  }
}).then(data => {
  console.info(data)
}, res => {
  console.info(res)
}).catch(err => {
  console.info(err)
})

// post
request({
  method: 'post',
  url: 'https://www.easy-mock.com/mock/5ab628fd72286c70d351bcf9/example/test',
  data: {
    hh: 'fdsa',
    fdsa: 'fjdlsajl'
  },
  // timeout: 10000,
  // dataType: 'json',
  // credentials: true
}).then(data => {
  console.info(data)
}, res => {
  console.info(res)
}).catch(err => {
  console.info(err)
})

// jsonp
request({
  method: 'jsonp',
  url: 'http://api.douban.com/v2/movie/search',
  params: {
    start: 0,
    count: 10,
    q: '爱情'
  }
}).then(data => {
  console.info(data)
}, res => {
  console.info(res)
}).catch(err => {
  console.info(err)
})

// FormData
document.getElementById('file').addEventListener('change', (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('file', file)

  request({
    method: 'post',
    url: '/upload',
    data: formData
  }).then(data => {
    console.info(data)
  }, res => {
    console.info(res)
  }).catch(err => {
    console.info(err)
  })
}, false)
```

*Tips: It will auto recognise FormData type and remove Content-Type so that browsers will inject by themselves.*

## API

### request

- method (string)
  - get [defeult]
  - post
  - jsonp
- url (string)
- headers (object)
- inlineData (object): replace `:{xxx}` in url with `inlineData['xxx']`
- params (object|string): param of query in url
- data (object): send data for post
- dataType (string)
  - form [default]
  - json: payload request
  - text: send string
- credentials (boolean) whether take cookie when cross domain
- timeout (number) how much time should spend at a request, default is infinite
- beforeRequest (function) run method before send request, it can change request options
- afterResponse (function) run method after get response, it can change response value

### response

- type (string)
  - load
  - error
  - timeout
- status (number) only `200 <= n < 300` is success
- statusText (string) code message
- response (any) data from server, it will be return directly when success

### global

- baseURL (string) as prefix for relative url if it is valid
- headers (object)
  - Accept: \*/\*
  - Content-Type: application/x-www-form-urlencoded
- beforeRequest (function) it will be override global
- afterResponse (function) it will be override global

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
