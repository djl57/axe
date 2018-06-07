# animate

[![version](https://img.shields.io/npm/v/@axe/animate.svg)](https://www.npmjs.org/package/@axe/animate)

a javascript library for animation or transition with css3 feature.

## Installation

```console
npm install @axe/animate
```

## Usage

### HTMLElement

```js
import Animate from '@axe/animate'

const el = document.getElementById('animate')
const animate = new Animate(el)

animate.addStyle({
  transition: 'transform 1s, background-color 3s'
})

animate.start({
  transform: 'translateX(600px)',
  backgroundColor: 'red'
}, () => {
  console.info('transition start')
}).end({
  // display: 'none'
  transform: 'translateX(0)'
}, () => {
  console.info('transition end')
})

el.addEventListener('click', () => {
  animate.start({
    animation: 'slideOutRight 3s ease'
  }, () => {
    console.info('animation start')
  }).end({
    animation: ''
  }, () => {
    console.info('animation end')
  })
}, false)
```

```css
@keyframes slideOutRight {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}
```

## API

### Animate

创建动画实例

参数：

* el：HTMLElement或者为空（对于mvvm类框架来说，可以在回调函数中触发渲染更新）

### animate.addStyle

自定义始化样式

参数：

* style：[Object] 样式

### animate.start

* style：[Object] 样式
* callback：[Function] 回调

### animate.end

* style：[Object] 样式
* callback：[Function] 回调

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
