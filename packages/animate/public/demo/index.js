import animate from '@'
import './style.css'

const transitionNode = document.getElementById('transition')
const animationNode = document.getElementById('animation')

transitionNode.addEventListener('click', () => {
  animate(transitionNode).init({
    style: {
      transform: 'translateX(0)'
    },
    callback () {
      console.info('init')
    }
  }).run({
    style: {
      transition: 'all 3s ease',
      transform: 'translateX(600px)'
    },
    callback () {
      console.info('run')
    }
  }).run({
    style: {
      transition: 'all 3s ease',
      transform: 'translateX(0)'
    },
    callback () {
      console.info('run')
    }
  }).end({
    style: {
      transition: ''
    },
    callback () {
      console.info('end')
    }
  })
}, false)

animationNode.addEventListener('click', () => {
  animate(animationNode).init({
    style: {},
    callback () {
      console.info('init')
    }
  }).run({
    style: {
      animation: 'slideOutRight 3s ease'
    },
    callback () {
      console.info('run')
    }
  }).end({
    style: {
      animation: ''
    },
    callback () {
      console.info('end')
    }
  })
}, false)