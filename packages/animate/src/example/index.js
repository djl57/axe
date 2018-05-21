import animate from '@/common'
import './style.css'

const transitionNode = document.getElementById('transition')
const animationNode = document.getElementById('animation')

transitionNode.addEventListener('click', () => {
  animate(transitionNode).init({
    transform: 'translateX(0)'
  }, () => {
    console.info('init')
  }).run({
    transition: 'all 3s ease',
    transform: 'translateX(600px)'
  }, () => {
    console.info('run')
  }).run({
    transition: 'all 3s ease',
    transform: 'translateX(0)'
  }, () => {
    console.info('run')
  }).end({
    transition: ''
  }, () => {
    console.info('end')
  })
}, false)

animationNode.addEventListener('click', () => {
  animate(animationNode).init({}, () => {
    console.info('init')
  }).run({
    animation: 'slideOutRight 3s ease'
  }, () => {
    console.info('run')
  }).end({
    animation: ''
  }, () => {
    console.info('end')
  })
}, false)
