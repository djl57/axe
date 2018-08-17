import { Tap, Press, Swipe } from '@/common'
import './style.css'

// tap
const tap = new Tap('#tap')
tap.addEvent(() => {
  console.info('tap')
})

// longtap
const longtap = new Tap('#longtap')
longtap.addEvent(() => {
  console.info('longtap')
}, 'longtap')

// doubletap
const doubletap = new Tap('#doubletap')
doubletap.addEvent(() => {
  console.info('doubletap')
}, 'doubletap')

// press
const press = new Press('#press')
press.addEvent(() => {
  console.info('press')
})

// swipe
const swipeNode = document.getElementById('swipe')

const swipe = new Swipe('#swipe')
swipe.onMove((offsetX, offsetY) => {
  swipeNode.style.left = offsetX + 'px'
  swipeNode.style.top = offsetY + 'px'
  console.info('swipe: x=' + offsetX + ', y=' + offsetY)
})
swipe.addEvent((direction) => {
  console.info('swipe ' + direction)
})
