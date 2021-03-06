export default {
  scrollEl: null,

  startY: 0,

  gpu: true,
  click: true,
  resizeTime: 100,
  touchToWrapper: false,
  loadRefresh: true,

  preventDefault: true,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
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
  bounceLimitDistance: 1000,

  scrollbar: true,

  pulltopLimitDistance: 100,
  pullbottomLimitDistance: 100
}
