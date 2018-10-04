# modal

[![version](https://img.shields.io/npm/v/@axe/modal.svg)](https://www.npmjs.org/package/@axe/modal)

## Api

### modal.show(options).then((isConfirm) => {})

**options**

* zIndex: 层级
* title: 标题
* content: 内容
* confirmText(确定): 确定按钮文字
* confirmColor: 确定按钮文字颜色
* cancelText: 取消按钮文字，若不设置则只显示确定按钮
* cancelColor: 取消按钮文字颜色
* closeByLayer(true): 点击蒙层是否关闭弹窗

*备注：若options为一个字符串，则其为content，其他字段使用默认值*

### modal.hide()

关闭弹窗，若同时有多个弹窗，则后面的弹窗会保存在队列中，待前面的弹窗关闭时，队列中的弹窗自动补上

### export Modal(el)

导出Modal，可以自行实例化一个新的弹窗，默认将DOM节点追加到body中

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
