import Animate from '@/common'
import './style.css'

const transitionEl = document.getElementById('transition')
const animationEl = document.getElementById('animation')
const requestAFEl = document.getElementById('requestAF')

const tAnimate = new Animate(transitionEl)
const aAnimate = new Animate(animationEl)
const rAnimate = new Animate(requestAFEl)

transitionEl.addEventListener('click', () => {
  tAnimate.style({
    transition: 'transform 1s',
    transform: 'translateX(600px)'
  }).done(() => {
    tAnimate.style({
      // transition: '',
      transform: 'translateX(0)'
    })

    console.info('transition end')
  })
}, false)

animationEl.addEventListener('click', () => {
  aAnimate.style({
    animation: 'slideOutRight 3s ease'
  }).done(() => {
    aAnimate.style({
      animation: ''
    })

    console.info('animation end')
  })
}, false)

let xDeg = 0

function loop () {
  window.requestAnimationFrame(() => {
    if (xDeg < 200) {
      xDeg += 2

      rAnimate.style({
        transform: `translateX(${xDeg}px)`
      })

      loop()
    } else {
      xDeg = 0

      rAnimate.style({
        transform: `translateX(${xDeg}px)`
      })

      console.info('requestAF end')
    }
  })
}

requestAFEl.addEventListener('click', () => {
  loop()
}, false)
