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

// press
touch.press(document.getElementById('press'), () => {
  console.info('press')
})

// swipe
const swipeNode = document.getElementById('swipe')
touch.swipe(swipeNode, (direction) => {
  console.info('swipe ' + direction)
}, {
  touchmove (offset) {
    swipeNode.style.left = offset + 'px'
    console.info('swipe: ' + offset)
  }
})