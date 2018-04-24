# touch

[![version](https://img.shields.io/npm/v/@axe/touch.svg)](https://www.npmjs.org/package/@axe/touch)

Define some usual gesture with touch events.

## Installation

```console
npm install @axe/touch
```

## Usage

```js
import Touch, { tap, longtap, doubletap, press, swipe } from '@'

const touch = new Touch(document.getElementById('touch'))

touch.tap(() => {
  console.info('touch tap')
}).press(() => {
  console.info('touch press')
})

// tap
tap(document.getElementById('tap'), () => {
  console.info('tap')
})

// longtap
longtap(document.getElementById('longtap'), () => {
  console.info('longtap')
}, {
  time: 500
})

// doubletap
doubletap(document.getElementById('doubletap'), () => {
  console.info('doubletap')
})

// press
press(document.getElementById('press'), () => {
  console.info('press')
})

// swipe
const swipeNode = document.getElementById('swipe')
swipe(swipeNode, (direction) => {
  console.info('swipe ' + direction)
}, {
  touchmove (offsetX, offsetY) {
    swipeNode.style.left = offsetX + 'px'
    swipeNode.style.top = offsetY + 'px'
    console.info('swipe: x=' + offsetX + ', y=' + offsetY)
  }
})
```

## API

### tap

This method is same to click but without delay for browser.

It has 3 arguments:

* node [HTMLElement] The element will be addEventListener
* callback [Function] It will be work when evnet trigger
* options [Object] Define default data by yourself, you needn't config as usual
  * time [Number:250] It will be trigger if touch less than time
  * offset [Number:10] It will be trigger if offset `less than` distance, unit is `px`

### doubletap

This method is same to tap but need twice touch quickly.

It arguments is same to tap.

### longtap

This method is same to tap but need long touch, `trigger when touchend`.

It has 3 arguments:

* node [HTMLElement] The element will be addEventListener
* callback [Function] It will be work when evnet trigger
* options [Object] Define default data by yourself, you needn't config as usual
  * time [Number:350] It will be trigger if touch `more than` time
  * offset [Number:10] It will be trigger if offset less than distance, unit is `px`

### press

This method is same to longtap but `trigger when timeout`.

It has 3 arguments:

* node [HTMLElement] The element will be addEventListener
* callback [Function] It will be work when evnet trigger
* options [Object] Define default data by yourself, you needn't config as usual
  * time [Number:350] It will be trigger if touch `more than` time
  * offset [Number:10] It will be trigger if offset less than distance, unit is `px`

### swipe

This method will be trigger when slide side.

It has 3 arguments:

* node [HTMLElement] The element will be addEventListener
* callback [Function] It will be work when evnet trigger
* options [Object] Define default data by yourself, you needn't config as usual
  * axis [String:'all'] The other value is horizontal and vertical
  * offset [Number:100] It will be trigger if offset `more than` distance, unit is `px`
  * speed [Number:200] It will be grigger if speed is fast and needn't enough offset
  * touchmove [Function(offsetX, offsetY)] It allow you handle moving event, and you can change element position in live
  * prevent [Boolean:true] PreventDefault when touch start

**NOTE**

when you use Touch, the node was inject initially so that you needn't pass it again.

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
