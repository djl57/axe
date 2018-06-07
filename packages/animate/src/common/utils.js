const fakeStyle = document.createElement('fakeelement').style
const prefixs = ['webkit', 'moz', 'ms', 'o']

const transitions = {
  'webkit': 'webkitTransitionEnd',
  'moz': 'transitionend',
  'ms': 'transitionend',
  'o': 'oTransitionEnd'
}

const animations = {
  'webkit': 'webkitAnimationEnd',
  'moz': 'animationend',
  'ms': 'animationend',
  'o': 'oAnimationEnd'
}

const transitionPrefix = getPrefix('transition')
const animationPrefix = getPrefix('animation')
const transformPrefix = getPrefix('transform')

export const transitionEvent = !transitionPrefix ? 'transitionend' : transitions[transitionPrefix]
export const animationEvent = !animationPrefix ? 'animationend' : animations[animationPrefix]

export function getPrefix (name) {
  if (name in fakeStyle) {
    return ''
  }

  // 首字母大写
  let upperName = name[0].toUpperCase() + name.substr(1)
  let i = 0
  let l = prefixs.length
  let realName

  // 前缀判断
  for (i = 0; i < l; i++) {
    realName = prefixs[i] + upperName

    if (realName in fakeStyle) {
      return prefixs[i]
    }
  }

  // 都不支持则返回空
  return ''
}

export function getProperty (name, prefix) {
  if (!prefix) {
    return name
  }

  return prefix + name[0].toUpperCase() + name.substr(1)
}

export function getStyle (name, value) {
  if (name.indexOf('transform') !== -1) {
    name = getProperty(name, transformPrefix)
  } else if (name.indexOf('animation') !== -1) {
    name = getProperty(name, animationPrefix)
  } else if (name.indexOf('transition') !== -1) {
    name = getProperty(name, transitionPrefix)

    if (transformPrefix && value.indexOf('transform') !== -1) {
      value = value.replace('transform', `-${transformPrefix}-transform`)
    }
  }

  return { name, value }
}
