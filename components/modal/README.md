# modal

[![version](https://img.shields.io/npm/v/@axe/modal.svg)](https://www.npmjs.org/package/@axe/modal)

## Api

### modal.show(options, callback)

**options**

* zIndex: 层级
* title: 标题
* content: 内容
* confirmText: 确定按钮文字
* confirmColor: 确定按钮文字颜色
* cancelText: 取消按钮文字，若不设置则只显示确定按钮
* cancelColor: 取消按钮文字颜色
* fixBody: 是否将body样式设置为overflow=hidden，防止页面滚动

**callback**

callback(type) => type[close, confirm, cancel]

type有3种类型，close为点击蒙层关闭、confirm为点击确定按钮、cancel为点击取消按钮

### modal.hide()


## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
