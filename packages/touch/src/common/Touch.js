import { tap, longtap, doubletap } from './gesture/tap'
import { press } from './gesture/press'
import { swipe } from './gesture/swipe'

export default class Touch {
  constructor (node) {
    if (typeof node !== 'string') {
      this.node = node
    } else {
      this.node = document.querySelector(node)
    }
  }

  tap (a, b) {
    tap(this.node, a, b)
    return this
  }

  longtap (a, b) {
    longtap(this.node, a, b)
    return this
  }

  doubletap (a, b) {
    doubletap(this.node, a, b)
    return this
  }

  press (a, b) {
    press(this.node, a, b)
    return this
  }

  swipe (a, b) {
    swipe(this.node, a, b)
    return this
  }
}
