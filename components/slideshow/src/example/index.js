import Slideshow from '@/common'
import './style.css'

const slideWrapEl = document.createElement('div')
slideWrapEl.style.cssText = [
  'width: 320px',
  'height: 200px',
  'margin: 20px auto',
  'overflow: hidden',
  'position: relative'
].join(';')
document.getElementById('root').appendChild(slideWrapEl)

const slideshow = new Slideshow({
  el: slideWrapEl,
  list: [
    { img: require('./images/1.jpg'), url: '/' },
    { img: require('./images/2.jpg'), url: '/' },
    { img: require('./images/3.jpg'), url: '/' },
    { img: require('./images/4.jpg'), url: '/' },
    { img: require('./images/5.jpg'), url: '/' }
  ],
  // autoplay: false,
  // seamless: false,
  onchange (index) {
    // console.log(index)
  }
})

console.info(slideshow)
