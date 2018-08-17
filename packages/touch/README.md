# touch

[![version](https://img.shields.io/npm/v/@axe/touch.svg)](https://www.npmjs.org/package/@axe/touch)

Define some usual gesture with touch events.

## Installation

```console
npm install @axe/touch
```

## Usage

```js
import { Tap, Press, Swipe } from '@axe/touch'

// tap
const tap = new Tap('#tap')
tap.addEvent(() => {
  console.info('tap')
})

// longtap
const longtap = new Tap('#longtap')
longtap.addEvent(() => {
  console.info('longtap')
}, 'longtap')

// doubletap
const doubletap = new Tap('#doubletap')
doubletap.addEvent(() => {
  console.info('doubletap')
}, 'doubletap')

// press
const press = new Press('#press')
press.addEvent(() => {
  console.info('press')
})

// swipe
const swipeNode = document.getElementById('swipe')

const swipe = new Swipe('#swipe')
swipe.onMove((offsetX, offsetY) => {
  swipeNode.style.left = offsetX + 'px'
  swipeNode.style.top = offsetY + 'px'
  console.info('swipe: x=' + offsetX + ', y=' + offsetY)
})
swipe.addEvent((direction) => {
  console.info('swipe ' + direction)
})
```

## API

### tap

This method is same to click but without delay for browser.

It has 3 arguments:

* node [HTMLElement] The element will be addEventListener
* options [Object] Define default data by yourself, you needn't config as usual
  * time [Number:250] It will be trigger if touch less than time
  * offset [Number:10] It will be trigger if offset `less than` distance, unit is `px`

event

* addEvent(fn, type = 'tap')
  * type: tap, doubletap, longtap
* removeEvent(fn, type = 'tap')
* dispatchEvent(type = 'tap')

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
