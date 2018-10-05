import tips from '@/common'
import './style.css'

// tips.show('解放军')

// setTimeout(() => {
//   tips.show('解放军2')
// }, 1000)

document.getElementById('tips').addEventListener('click', () => {
  tips.show({
    content: '锦峰大厦拉进来的房间里撒娇了饭',
    duration: 3000
  }).then(() => {
    console.info('end')
  })
}, false)

document.getElementById('html').addEventListener('click', () => {
  tips.show({
    contentHtml: ['<p>放大空间</p>', '<p>锦峰大厦拉进来的房间里撒娇了饭</p>'].join(''),
    duration: 3000
  }).then(() => {
    console.info('end2')
  })
}, false)

document.getElementById('loading').addEventListener('click', () => {
  tips.show({
    icon: 'icon icon-loading',
    content: '加载中',
    duration: 3000
  }).then(() => {
    console.info('loading end')
  })
}, false)

document.getElementById('success').addEventListener('click', () => {
  tips.show({
    icon: 'icon icon-success',
    content: '成功',
    duration: 3000
  }).then(() => {
    console.info('success end')
  })
}, false)

document.getElementById('error').addEventListener('click', () => {
  tips.show({
    icon: 'icon icon-error',
    content: '错误',
    duration: 3000
  }).then(() => {
    console.info('error end')
  })
}, false)

document.getElementById('info').addEventListener('click', () => {
  tips.show({
    icon: 'icon icon-info',
    content: '提示',
    duration: 3000
  }).then(() => {
    console.info('info end')
  })
}, false)

document.getElementById('question').addEventListener('click', () => {
  tips.show({
    icon: 'icon icon-question',
    content: '疑问',
    duration: 3000
  }).then(() => {
    console.info('question end')
  })
}, false)
