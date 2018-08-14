import './style.css'
import image from './image.json'

export function getPageEl (page, pageSize = 10) {
  const divEl = document.createElement('div')
  divEl.className = 'page'

  const start = page * pageSize
  const end = (page + 1) * pageSize
  let item
  let html = ''

  for (let i = start; i < end; i++) {
    item = image.list[i]

    html += `
      <div class="box">
        <h3 class="title">${item.cnTitle || '无题'}</h3>
        <p class="subTitle">${item.title}</p>
        <!-- <img class="img" src="https://goss.veer.com/${item.oss1600Watermark}" alt="" /> -->
        <div class="block">${i}</div>
      </div>
    `
  }

  divEl.innerHTML = html

  return divEl
}
