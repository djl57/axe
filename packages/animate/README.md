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
import animate from '@axe/animate'

const transitionNode = document.getElementById('transition')
const animationNode = document.getElementById('animation')

transitionNode.addEventListener('click', () => {
  animate(transitionNode).init({
    transform: 'translateX(0)'
  }, () => {
    console.info('init')
  }).run({
    transition: 'all 3s ease',
    transform: 'translateX(600px)'
  }, () => {
    console.info('run')
  }).run({
    transition: 'all 3s ease',
    transform: 'translateX(0)'
  }, () => {
    console.info('run')
  }).end({
    transition: ''
  }, () => {
    console.info('end')
  })
}, false)

animationNode.addEventListener('click', () => {
  animate(animationNode).init({}, () => {
    console.info('init')
  }).run({
    animation: 'slideOutRight 3s ease'
  }, () => {
    console.info('run')
  }).end({
    animation: ''
  }, () => {
    console.info('end')
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

### Render

```js
import React, { Component } from 'react'
import animate from '@axe/animate'

export default class Root extends Component {
  constructor (props) {
    super(props)

    this.state = {
      style: {}
    }
  }

  componentDidMount () {
    animate().init({
      width: '200px',
      height: '200px',
      backgroundColor: 'red',
      transform: 'translateX(500px)'
    }, (style) => {
      console.info('init')
      this.setState({ style })
    }).run({
        transition: 'transform 3s ease',
        transform: 'translateX(0)'
    }, (style) => {
      console.info('run')
      this.setState({ style })
    }).end({
      backgroundColor: 'green'
    }, (style) => {
      console.info('end')
      this.setState({ style })
    })
  }

  render () {
    return (
      <div>
        <h1 style={this.state.style}>Hello, fle-cli.</h1>
      </div>
    )
  }
}
```

## API

### animate

创建动画实例（不需要new关键词）

参数：

* node：HTMLElement或者为空（对于mvvm类框架来说，可以在回调函数中触发渲染更新）

说明：回调中的style和原始的style可能会不一样，因为我们会检索当前浏览器是否支持css属性，不支持则返回带有前缀的css属性

### animate.init

定义初始化样式

参数：

* style：样式
* callback：回调函数，参数为style，会检测css属性并追加前缀

### animate.run

开始执行动画，参数同上

### animate.end

动画结束，参数同上

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
