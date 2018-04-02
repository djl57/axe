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
    style: {
      transform: 'translateX(0)'
    },
    callback () {
      console.log('init')
    }
  }).run({
    style: {
      transition: 'all 3s ease',
      transform: 'translateX(600px)'
    },
    callback () {
      console.log('run')
    }
  }).run({
    style: {
      transition: 'all 3s ease',
      transform: 'translateX(0)'
    },
    callback () {
      console.log('run')
    }
  }).end({
    style: {
      transition: ''
    },
    callback () {
      console.log('end')
    }
  })
}, false)

animationNode.addEventListener('click', () => {
  animate(animationNode).init({
    style: {},
    callback () {
      console.log('init')
    }
  }).run({
    style: {
      animation: 'slideOutRight 3s ease'
    },
    callback () {
      console.log('run')
    }
  }).end({
    style: {
      animation: ''
    },
    callback () {
      console.log('end')
    }
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
      titleStyle: {}
    }
  }

  componentDidMount () {
    animate(this.setState.bind(this)).init({
      key: 'titleStyle',
      style: {
        width: '200px',
        height: '200px',
        backgroundColor: 'red',
        transform: 'translateX(500px)'
      },
      callback () {
        console.log('init')
      }
    }).run({
      key: 'titleStyle',
      style: {
        transition: 'transform 3s ease',
        transform: 'translateX(0)'
      },
      callback () {
        console.log('run 1')
      }
    }).run({
      key: 'titleStyle',
      style: {
        transition: 'transform 1s ease',
        transform: 'translateX(200px)'
      },
      callback () {
        console.log('run 2')
      }
    }).run({
      key: 'titleStyle',
      style: {
        transition: 'transform 2s ease',
        transform: 'translateX(100px)'
      },
      callback () {
        console.log('run 3')
      }
    }).end({
      key: 'titleStyle',
      style: {
        backgroundColor: 'green'
      },
      callback () {
        console.log('end')
      }
    })
  }

  render () {
    return (
      <div>
        <h1 style={this.state.titleStyle}>Hello, fle-cli.</h1>
      </div>
    )
  }
}
```

## API

### animate

创建动画实例（不需要new关键词）

参数：

* nodeOrRender：HTMLElement或者触发DOM更新的方法（如`React`的`setState`，但注意要将`this`绑定在`setState`方法上）

*Tips：vue可以在methods写一个类似setState的方法，挂载到animate上*

### animate.init

定义初始化样式

参数：

* options[Object]
  * key：仅对Render有效，表示state中的键值
  * style：样式
  * callback：回调函数

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
