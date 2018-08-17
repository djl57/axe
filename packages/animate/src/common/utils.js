const style = document.createElement('div').style
const prefixes = {
  'webkit': 'Webkit',
  'moz': 'Moz',
  'o': 'O',
  'ms': 'ms'
}
const transitions = {
  'webkit': 'webkitTransitionEnd',
  'moz': 'transitionend',
  'o': 'oTransitionEnd',
  'ms': 'MSTransitionend'
}
const animations = {
  'webkit': 'webkitAnimationEnd',
  'moz': 'animationend',
  'o': 'oAnimationEnd',
  'ms': 'MSAnimationend'
}

const cache = {} // 缓存数据

// 判断是否需要前缀并获取style名称
export function getStyleName (name) {
  if (name.indexOf('-') !== -1) {
    name = name.replace(/-[a-z]/g, s => s[1].toUpperCase())
  }

  if (cache[name]) {
    return cache[name].style
  }

  let prefix = ''
  let styleName = name

  if (!(styleName in style)) {
    let key, prefixName
    let upperName = name[0].toUpperCase() + name.substr(1)

    for (key in prefixes) {
      prefixName = prefixes[key] + upperName

      if (prefixName in style) {
        prefix = key
        styleName = prefixName
        break
      }
    }
  }

  cache[name] = {
    prefix,
    style: styleName
  }

  return styleName
}

getStyleName('transform')
getStyleName('transition')
getStyleName('animation')

export const cssTransform = !cache['transform'].prefix ? 'transform' : '-' + cache['transform'].prefix + '-transform'

export const transitionend = !cache['transition'].prefix ? 'transitionend' : transitions[cache['transition'].prefix]
export const animationend = !cache['animation'].prefix ? 'animationend' : animations[cache['animation'].prefix]
