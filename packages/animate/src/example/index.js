import Animate from '@/common'
import './style.css'

const el = document.getElementById('animate')
const animate = new Animate(el)

animate.addStyle({
  transition: 'transform 1s, background-color 3s'
})

animate.start({
  transform: 'translateX(600px)',
  backgroundColor: 'red'
}, () => {
  console.info('transition start')
}).end({
  // display: 'none'
  transform: 'translateX(0)'
}, () => {
  console.info('transition end')
})

el.addEventListener('click', () => {
  animate.start({
    animation: 'slideOutRight 3s ease'
  }, () => {
    console.info('animation start')
  }).end({
    animation: ''
  }, () => {
    console.info('animation end')
  })
}, false)
