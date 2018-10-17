# 模拟滚动

[![version](https://img.shields.io/npm/v/@axe/scroller.svg)](https://www.npmjs.org/package/@axe/scroller)

移动端模拟滚动代替原生滚动，用于解决原生滚动不好支持的业务场景。

## 开始安装

```console
npm install @axe/scroller
```

## 如何使用

```html
<div id="root">
  <div className="scroller">
    <p>This is text</p>
    <p>This is text</p>
    <p>This is text</p>
    <p>This is text</p>
    <p>This is text</p>
    <p>This is text</p>
    ......
    <p>This is text</p>
  </div>
</div>
```

```js
import Scroller from '@axe/scroller'

const rootEl = document.getElementById('root')

rootEl.style.height = '100%'
rootEl.style.overflow = 'hidden'

const scroller = new Scroller(rootEl, {})

scroller.on('scrollstart', info => {
  console.info('scrollstart', info)
})

scroller.on('scroll', info => {
  console.info('scroll', info)
})

scroller.on('scrollend', info => {
  console.info('scrollend', info)
})
```

## API

### options

```
const scroller = new Scroller(el, options)
```

* el：滚动容器（设置滚动的高度），至少包含一个子节点（实际的内容区，也是滚动操作的对象，默认取第一个子节点）
* options：配置选项，如下

```js
const defaults = {
  scrollEl: null, // [string, element] 自定义滚动的内容区，默认取容器中的第一个子节点

  startY: 0, // 设置滚动的初识位置

  gpu: true, // 是否开启gpu渲染
  click: true, // 是否需要绑定click事件
  resizeTime: 100, // 手机横竖屏切换时，重新计算滚动范围的延迟时间
  touchToWrapper: false, // 是否将touch事件绑定在滚动容器中，默认绑定在window对象，这样当手指离开容器时还可以继续滚动，这是我们期望的
  loadRefresh: true, // window.onload后计算滚动范围，在一开始可能样式、图片等资源未加载完成，此时的高度是不准确的

  preventDefault: true, // touch时阻止默认行为
  preventDefaultException: { // 表单、超链接等默认行为是需要的，因此排除在外，当然你还可以根据DOM的其他属性进行正则匹配，排除不需要阻止默认行为的节点
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
  },

  stopPropagation: false, // 阻止冒泡

  momentum: true, // 开启惯性滚动
  momentumDuration: 2500, // 惯性滚动过渡时间，单位：ms，其它时间的单位同理
  momentumBounceDuration: 500, // 超出边界的回弹过渡时间
  momentumLimitTime: 300, // 限制惯性滚动触发的最小时间，注意这个时间是在移动过程中的一个片段，假如刚开始缓慢移动，后来快速移动，那我们捕捉的是后面的操作，认为其可以触发惯性滚动
  momentumLimitDistance: 15, // 限时惯性滚动的最小移动距离，同上，也是移动时的一个片段
  deceleration: 0.0015, // 惯性滚动时，减速阶段的加速度，值越大，停止的越快，一般不需要修改默认值

  bounce: true, // 是否开启边界回弹
  bounceRate: 1.5, // 回弹的比率，数值越小，回弹的越远
  bounceDuration: 800, // 回弹的过渡时间
  bounceLimitDistance: 1000, // 回弹的最远距离

  scrollbar: true, // 是否开启滚动指示器（在滚动区域右侧）

  pulltopLimitDistance: 100, // 顶部下拉回弹的停留距离
  pullbottomLimitDistance: 100 // 底部上拉回弹的停留距离
}
```

实例的属性：

```js
this.minScrollY = 0 // 最小滚动位置，超出则回弹
this.maxScrollY = 0 // 最大滚动位置，默认为滚动节点的高度，超出则回弹

this.y = 0 // 当前滚动位置
this.previousY = 0 // 上一次的滚动位置
this.pointY = 0 // 记录touch过程的位置

this.startTime = 0 // 记录momentum时间点
this.startY = 0 // 记录momentum位置

this.endTime = 0 // touchend时的时间点

this.relativeY = 0 // 相对于视窗的位置

// 方向：从下往上（向上滑）为负数， 从上往下（向下滑）为正数
this.distanceY = 0 // 记录touch过程中移动的距离
this.movingDistanceY = 0 // 滑动过程中的距离
```

# methods

* getLiveY：获取当前的滚动位置
* stop：停止正在进行的惯性滚动
* enable：开启滚动
* disable：禁用滚动
* destroy：销毁滚动及其绑定的事件
* on(event, fn)：注册事件
* off(event, fn)：销毁事件
* trigger(event, info)：主动触发注册的事件
* refresh：刷新滚动
* refreshAfterImgLoaded(imgs)：等待图片加载完成后再刷新，imgs可以是string、element或者[string|element]
* setScroll(min, max)：手动设置滚动访问
* setScrollByElement(el)：根据节点设置滚动范围
* resetScroll(duration, easeStyle)：若超出边界则回弹
* scrollTo(y, duration, easeStyle)：滚动到指定位置
* scrollToElement(el, duration, valign, easeStyle)：滚动到指定节点的位置，其中valign有top、middle、bottom3个值，表示滚动到节点的什么位置
* scrollByOffset(distance, duration, easeStyle)：相对于当前的位置进行偏移滚动
* pulltopDone(options)：顶部下拉加载完成时调用，以免重复加载，options：reset（加载完成后若超出边界则回弹）、refresh（加载完成后刷新滚动）、needLoadImgs（有新图片加入，等待其加载完成后刷新）、onHide（边界回弹结束后触发方法）
* pullbottomDone(options)：底部上拉加载完成时调用，以免重复加载，参数同上

**备注**

easeStyle：

内置有：

* swipe
* bounce
* swipeBounce

也可以是：

* ease
* ease-in
* ease-out
* ease-in-out
* ...

# events

通过`on`注册的事件有：

* refresh：刷新滚动后触发
* touchstart：手指触摸屏幕时触发
* touchmove：手指在屏幕上移动时触发
* touchend：手指离开屏幕时触发
* scrollstart：滚动开始时触发
* scroll：滚动中触发
* scrollend：滚动结束时触发
* pulltopstart：顶部下拉生效时触发
* pulltopcancel：顶部下拉取消
* pulltop：顶部下拉加载中，加载完成后需要调用`pulltopDone`

* pullbottomstart：底部上拉生效时触发
* pullbottomcancel：底部上拉取消
* pullbottom：底部上拉加载中，加载完成后需要调用`pullbottomDone`

## 环境配置

构建工具

``` bash
$ npm install -g fle-cli

# yarn
$ yarn global add fle-cli
```

命令说明

```bash
# 本地开发
fle dev

# 代码构建
fle build
```

查看更多说明： [构建文档](https://www.npmjs.com/package/fle-cli)
