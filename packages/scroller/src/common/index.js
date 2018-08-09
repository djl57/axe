import defaults from './defaults'
import { warn } from './tools/util'
import { hasPerspective } from './tools/dom'

import init from './core/init'
import event from './core/event'
import method from './core/method'
import expose from './core/expose'

export default function Scroller (el, options) {
  // 容器节点，由于限制显示的高度
  this.wrapEl = typeof el === 'string' ? document.querySelector(el) : el
  if (!this.wrapEl) {
    warn('Can not resolve the wrapper DOM.')
  }

  // 滚动节点，取容器节点的第一个子节点
  this.scrollEl = this.wrapEl.firstElementChild
  if (!this.scrollEl) {
    warn('The wrapper need at least one child element to be scroller.')
  }

  this.clientHeight = document.documentElement.clientHeight
  this.clientWidth = document.documentElement.clientWidth

  this.scrollStyle = this.scrollEl.style // 缓存滚动节点内联样式

  this.wrapComputedStyle = window.getComputedStyle(this.wrapEl, null) // 缓存容器节点的实际样式
  this.scrollComputedStyle = window.getComputedStyle(this.scrollEl, null) // 缓存滚动节点的实际样式

  // 配置选项
  this.options = Object.assign({}, defaults, options)

  if (this.options.bounce === true) {
    this.options.bounce = {
      top: true,
      bottom: true
    }
  } else if (!this.options.bounce) {
    this.options.bounce = {
      top: false,
      bottom: false
    }
  }

  // 是否开启gpu渲染
  this.translateZ = (this.options.gpu && hasPerspective) ? ' translateZ(0)' : ''

  this.y = 0 // 当前滚动位置
  this.pointY = 0 // 记录touch过程的位置

  this.minScrollY = 0 // 最小滚动位置，超出则回弹
  this.maxScrollY = 0 // 最大滚动位置，默认为滚动节点的高度，超出则回弹

  this.startTime = 0 // 记录momentum时间点
  this.startY = 0 // 记录momentum位置

  this.relativeY = 0 // 相对于视窗的位置

  // 方向：从下往上（向上滑）为负数， 从上往下（向下滑）为正数
  // this.directionY = 0
  // this.distanceY = 0 // 滑动开始至结束的方向
  // this.movingDistanceY = 0 // 滑动过程中的方向

  this.isDisabled = false // 是否禁止滚动
  this.isInTouch = false // 是否处于touch行为中，false表示终止touch事件
  this.isInTransition = false // 是否处于过渡动画中

  // 调用注入的方法
  this._init()
}

// 注入实例方法
Object.assign(Scroller.prototype, init, event, method, expose)
