import tips from '@/common'
import './style.css'

// tips.show('解放军', 2000, () => {
//   console.info('end0')
// })

// setTimeout(() => {
//   tips.show('解放军2', 3000, () => {
//     console.info('end01')
//   })
// }, 1000)

document.getElementById('tips').addEventListener('click', () => {
  tips.show({
    content: '锦峰大厦拉进来的房间里撒娇了饭',
    duration: 3000
  }, () => {
    console.info('end')
  })
}, false)

document.getElementById('html').addEventListener('click', () => {
  tips.show({
    contentHtml: ['<p>放大空间</p>', '<p>锦峰大厦拉进来的房间里撒娇了饭</p>'].join(''),
    duration: 3000
  }, () => {
    console.info('end2')
  })
}, false)

document.getElementById('loading').addEventListener('click', () => {
  tips.show({
    contentHtml: '<i class="icon icon-loading"></i><p class="icon-text">加载中</p>',
    duration: 3000
  }, () => {
    console.info('loading end')
  })
}, false)

document.getElementById('success').addEventListener('click', () => {
  tips.show({
    contentHtml: '<i class="icon icon-success"></i><p class="icon-text">成功</p>',
    duration: 3000
  }, () => {
    console.info('success end')
  })
}, false)

document.getElementById('error').addEventListener('click', () => {
  tips.show({
    contentHtml: '<i class="icon icon-error"></i><p class="icon-text">错误</p>',
    duration: 3000
  }, () => {
    console.info('error end')
  })
}, false)

document.getElementById('info').addEventListener('click', () => {
  tips.show({
    contentHtml: '<i class="icon icon-info"></i><p class="icon-text">提示</p>',
    duration: 3000
  }, () => {
    console.info('info end')
  })
}, false)

document.getElementById('question').addEventListener('click', () => {
  tips.show({
    contentHtml: '<i class="icon icon-question"></i><p class="icon-text">疑问</p>',
    duration: 3000
  }, () => {
    console.info('question end')
  })
}, false)
