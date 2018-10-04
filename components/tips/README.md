# tips

[![version](https://img.shields.io/npm/v/@axe/tips.svg)](https://www.npmjs.org/package/@axe/tips)

## Api

### tips.show(options).then(() => {})

**options**

* zIndex: 层级
* content: 文本内容
* contentHtml: html内容
* duration = 1500: 显示的时间
* immediate = true: 是否立即显示（会覆盖上次还未关闭的提示），若为false则加入队列中，等待上次提示关闭再显示

### tips.hide()

关闭提示

### tips.hideAll()

关闭所有提示，包括队列中的

### export Tips(el)

导出Tips，可以自行实例化一个新的提示，默认将DOM节点追加到body中

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
