export default {
  startY: 0,

  gpu: true,
  touchOnWindow: true,
  click: true,

  preventDefault: true,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
  },

  stopPropagation: false,

  momentum: true,
  momentumDuration: 2500,
  momentumBounceDuration: 500,
  momentumLimitTime: 300,
  momentumLimitDistance: 15,
  deceleration: 0.0015,

  bounce: true,
  bounceRate: 1.5,
  bounceDuration: 800,
  bounceLimitDistance: 1000
}
