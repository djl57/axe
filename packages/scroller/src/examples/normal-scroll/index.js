import { getPageEl } from '@/resources/render'
import './style.css'

const appEl = document.getElementById('app')

for (let page = 0; page < 3; page++) {
  appEl.appendChild(getPageEl(page))
}
