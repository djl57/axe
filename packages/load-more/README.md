# load-more

[![version](https://img.shields.io/npm/v/@axe/load-more.svg)](https://www.npmjs.org/package/@axe/load-more)

滚动到容器底部触发加载更多内容

## 如何使用

```js
import LoadMore from '@axe/load-more'

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
  }, 1500)
}

appendHtml()

const loadMore = new LoadMore({
  el: document.documentElement,
  distance: 10,
  cutTime: 100,
  onScrollBottom () {
    loadMore.lock()
    appendHtml()
  }
})
```

## API

### LoadMore

options

* el = document.documentElement: 滚动节点
* distance = 10: 离底部的距离小于等于该值则触发方法
* cutTime = 100: 滚动截流函数的等待时间
* onScrollBottom: [Function] 滚动到底部后触发的函数

### loadMore.lock

锁定滚动加载，避免一次滚动加载多次内容

### loadMore.unlock

解除锁定状态，可以继续滚动加载更多内容

## 环境配置

构建工具

``` bash
$ npm install -g fle-cli

# yarn
$ yarn global add fle-cli
```

命令说明

```bash
# 本地开发
fle dev

# 代码构建
fle build
```

查看更多说明： [构建文档](https://www.npmjs.com/package/fle-cli)

## 补充说明
