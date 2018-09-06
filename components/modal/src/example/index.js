import modal from '@/common'
import './style.css'

document.getElementById('alert').addEventListener('click', () => {
  modal.show({
    title: '标题',
    content: '和发动机撒路附近的撒了疯狂'
  }, type => {
    console.info(type)
  })
}, false)
document.getElementById('confirm').addEventListener('click', () => {
  modal.show({
    title: '标题',
    content: '和发动机撒路附近的撒了疯',
    cancelText: true
  }, type => {
    console.info(type)
  })
}, false)
