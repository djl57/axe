import tips from '@'
import './style.css'

document.getElementById('tips').addEventListener('click', () => {
  tips.show({
    content: '锦峰大厦拉进来的房间里撒娇了饭',
    duration: 3000
  }, () => {
    console.info('end')
  })
}, false)
