import LoadMore from '@/common'
import './style.css'

const rootEl = document.getElementById('root')
let index = 0

function appendHtml (n = 50) {
  let fragEl = document.createDocumentFragment()

  for (let i = 1; i <= n; i++) {
    let childEl = document.createElement('p')
    childEl.textContent = (i + index) + ': 这里是文本内容'
    fragEl.appendChild(childEl)
  }

  // 模拟异步请求
  setTimeout(() => {
    index += n
    loadMore.unlock()
    rootEl.appendChild(fragEl)
  }, 1000)
}

appendHtml()

const loadMore = new LoadMore({
  // el: document.body,
  distance: 10,
  cutTime: 100,
  onScrollBottom () {
    loadMore.lock()
    appendHtml()
  }
})
