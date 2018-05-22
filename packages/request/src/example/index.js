import request from '@/common'
import './style.css'

/* defaults */
// request.defaults.baseURL = 'http://localhost:5000'
// request.defaults.beforeRequest = function (req) {
//   req.url += '/fdsa'
// }
// request.defaults.afterResponse = function (res) {
//   res.status = 0
// }

// get
document.getElementById('request_get').addEventListener('click', () => {
  request({
    method: 'get',
    url: 'https://www.easy-mock.com/mock/5ab628fd72286c70d351bcf9/example/query',
    params: {
      id: 1,
      name: 'name'
    }
  }).then(data => {
    console.info('--------------success----------------')
    console.info(data)
    console.info('------------------------------')
  }, res => {
    console.info('--------------fail----------------')
    console.info(res)
    console.info('------------------------------')
  }).catch(err => {
    console.info('--------------error----------------')
    console.info(err)
    console.info('------------------------------')
  })
}, false)

// post
document.getElementById('request_post').addEventListener('click', () => {
  request({
    method: 'post',
    url: 'https://www.easy-mock.com/mock/5ab628fd72286c70d351bcf9/example/test',
    data: {
      hh: 'fdsa',
      fdsa: 'fjdlsajl'
    }
    // dataType: 'json',
    // credentials: true
  }).then(data => {
    console.info('--------------success----------------')
    console.info(data)
    console.info('------------------------------')
  }, res => {
    console.info('--------------fail----------------')
    console.info(res)
    console.info('------------------------------')
  }).catch(err => {
    console.info('--------------error----------------')
    console.info(err)
    console.info('------------------------------')
  })
}, false)

// jsonp
document.getElementById('request_jsonp').addEventListener('click', () => {
  request({
    method: 'jsonp',
    url: 'http://api.douban.com/v2/movie/search',
    // timeout: 1000,
    params: {
      start: 0,
      count: 10,
      q: '爱情'
    }
  }).then(data => {
    console.info('--------------success----------------')
    console.info(data)
    console.info('------------------------------')
  }, res => {
    console.info('--------------fail----------------')
    console.info(res)
    console.info('------------------------------')
  }).catch(err => {
    console.info('--------------error----------------')
    console.info(err)
    console.info('------------------------------')
  })
}, false)

// formdata
document.getElementById('request_file').addEventListener('change', (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('image', file)

  request({
    method: 'post',
    url: '/upload',
    data: formData
  }).then(data => {
    console.info('--------------success----------------')
    console.info(data)
    console.info('------------------------------')
  }, res => {
    console.info('--------------fail----------------')
    console.info(res)
    console.info('------------------------------')
  }).catch(err => {
    console.info('--------------error----------------')
    console.info(err)
    console.info('------------------------------')
  })
}, false)
