import modal from '@/common'
import './style.css'

// modal.show('房间的开始', (isConfirm) => {
//   console.info(isConfirm ? 'comfirm0' : 'cancel0')
// })

// modal.show('房间的开始1', (isConfirm) => {
//   console.info(isConfirm ? 'comfirm01' : 'cancel01')
// })

// modal.show('房间的开始2', (isConfirm) => {
//   console.info(isConfirm ? 'comfirm02' : 'cancel02')
// })

document.getElementById('alert').addEventListener('click', () => {
  modal.show({
    title: '标题',
    content: '和发动机撒路附近的撒了疯狂',
    closeByLayer: false
  }, (isConfirm) => {
    console.info(isConfirm ? 'comfirm' : 'cancel')
  })
}, false)

document.getElementById('confirm').addEventListener('click', () => {
  modal.show({
    title: '标题',
    content: '和发动机撒路附近的撒了疯',
    cancelText: '取消'
  }, (isConfirm) => {
    console.info(isConfirm ? 'comfirm2' : 'cancel2')
  })
}, false)

document.getElementById('html').addEventListener('click', () => {
  modal.show({
    title: '标题',
    contentHtml: ['<p>积分电路设计</p>', '<p>积分电路设计</p>'].join(''),
    cancelText: '取消'
  }, (isConfirm) => {
    console.info(isConfirm ? 'comfirm3' : 'cancel3')
  })
}, false)
