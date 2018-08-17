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

animate.style({
  transition: 'transform 1s',
  transform: 'translateX(600px)'
}).done(() => {
  animate.style({
    transition: '',
    transform: 'translateX(0)'
  })

  console.info('transition end')
})
```

## API

### Animate

创建动画实例

参数：

* el：HTMLElement或者字符串选择器

### animate.style

自定义样式，会自动判断是否需要增加css前缀

参数：

* style：[Object] 样式


### animate.done

* callback：[Function] 在transition或animation结束时触发

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
