import '@/common'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const fastclickEl = document.getElementById('fastclick')
  const timesEl = document.getElementById('times')

  fastclickEl.addEventListener('click', () => {
    timesEl.textContent = +timesEl.textContent + 1
  }, false)
}, false)
