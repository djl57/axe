import modal from '@/common'
import './style.css'

document.getElementById('alert').addEventListener('click', () => {
  modal.show({
    title: '标题',
    content: '和发动机撒路附近的撒了疯狂',
    closeByLayer: false
  }).then((isConfirm) => {
    console.info(isConfirm ? 'comfirm' : 'cancel')
  })
}, false)

document.getElementById('confirm').addEventListener('click', () => {
  modal.show({
    title: '标题',
    content: '和发动机撒路附近的撒了疯',
    cancelText: '取消'
  }).then((isConfirm) => {
    console.info(isConfirm ? 'comfirm' : 'cancel')
  })
}, false)
