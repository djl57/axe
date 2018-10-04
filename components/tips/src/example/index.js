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
