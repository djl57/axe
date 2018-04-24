import Touch, { tap, longtap, doubletap, press, swipe } from '@'
import './style.css'

const touch = new Touch(document.getElementById('touch'))

touch.tap(() => {
  console.info('touch tap')
}).press(() => {
  console.info('touch press')
})

// tap
tap(document.getElementById('tap'), () => {
  console.info('tap')
})

// longtap
longtap(document.getElementById('longtap'), () => {
  console.info('longtap')
})

// doubletap
doubletap(document.getElementById('doubletap'), () => {
  console.info('doubletap')
})

// press
press(document.getElementById('press'), () => {
  console.info('press')
})

// swipe
const swipeNode = document.getElementById('swipe')
swipe(swipeNode, (direction) => {
  console.info('swipe ' + direction)
}, {
  touchmove (offsetX, offsetY) {
    swipeNode.style.left = offsetX + 'px'
    swipeNode.style.top = offsetY + 'px'
    console.info('swipe: x=' + offsetX + ', y=' + offsetY)
  }
})