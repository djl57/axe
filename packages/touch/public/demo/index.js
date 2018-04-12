import touch from '@'
import './style.css'

// tap
touch.tap(document.getElementById('tap'), () => {
  console.info('tap')
})

// longtap
touch.longtap(document.getElementById('longtap'), () => {
  console.info('longtap')
})

// doubletap
touch.doubletap(document.getElementById('doubletap'), () => {
  console.info('doubletap')
})

// press
touch.press(document.getElementById('press'), () => {
  console.info('press')
})

// swipe
const swipeNode = document.getElementById('swipe')
touch.swipe(swipeNode, (direction) => {
  console.info('swipe ' + direction)
}, {
  touchmove (offsetX, offsetY) {
    swipeNode.style.left = offsetX + 'px'
    swipeNode.style.top = offsetY + 'px'
    console.info('swipe: x=' + offsetX + ', y=' + offsetY)
  }
})