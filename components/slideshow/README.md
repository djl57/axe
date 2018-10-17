# slideshow

[![version](https://img.shields.io/npm/v/@axe/slideshow.svg)](https://www.npmjs.org/package/@axe/slideshow)

## Api

### new Slideshow(options)

**options**

* el: element|string, 轮播容器
* list: array, 轮播子节点
* initIndex: 0, 初始化位置索引
* seamless: true, 是否开启无限滚动（头尾相接）
* limitDistince: this.width / 2, 切换索引的最小滑动距离，默认是当前宽度的一半
* limitSpeed: 0.2, 切换索引的最小滑动速度，距离和速度满足任意一个即可以切换
* autoplay: 3000, 设置自动轮播时间，若为0则不进行自动轮播
* indicator: true, 是否显示索引指示器
* indicatorClass: 自定义指示器样式
  - list: 列表样式
  - item: 圆点样式
  - itemActive: 激活状态圆点样式
* preventDefault: true, 是否阻止默认事件
* transition: 过渡动画设置
  - duration: 500, 过渡时间
  - timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', 过渡曲线
* onchange: null, 索引改变触发的方法，参数是当前的索引（index）

**备注：组件会根据el的宽度和list的长度自动计算滑动的宽度，list的项可以是DOM节点、html或object {img, url}**

### slideshow.changeIndex(n)

改变索引，若想切换下一页，则n = 1；若想切换上一页，则n = -1。

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
