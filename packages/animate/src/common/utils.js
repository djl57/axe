const style = document.createElement('div').style
const vendors = {
  webkit: 'Webkit',
  moz: 'Moz',
  o: 'O',
  ms: 'ms'
}
const eventVendors = {
  webkit: 'webkit',
  moz: '',
  o: 'o',
  ms: 'MS'
}
const cache = {}

// 根据css熟悉获取浏览器前缀
export function getVendorName (name) {
  if (name in style) {
    return ''
  }

  let upperName = name[0].toUpperCase() + name.substr(1)

  for (let key in vendors) {
    if ((vendors[key] + upperName) in style) {
      return key
    }
  }

  return ''
}

// 判断是否需要前缀并获取style名称
export function getStyleName (name) {
  if (cache[name]) {
    return cache[name]
  }

  let vendor = getVendorName(name)
  cache[name] = !vendor ? name : vendor + name[0].toUpperCase() + name.substr(1)

  return cache[name]
}

// 判断是否需要前缀并获取css名称
export function getCssName (name) {
  let vendor = getVendorName(name)
  let cssName = name.replace(/[A-Z]/g, s => '-' + s.toLowerCase())
  return !vendor ? cssName : '-' + vendor + '-' + cssName
}

// 判断是否需要前缀并获取event名称，如：transitionend、animationend等
export function getEventName (name) {
  let key

  if (name.indexOf('transition') === 0) {
    key = 'transition'
  } else if (name.indexOf('animation') === 0) {
    key = 'animation'
  }

  if (!key) {
    return name
  }

  let vendor = eventVendors[getVendorName(key)]

  if (!vendor) {
    return name
  } else {
    let suffixName = name.substr(key.length)
    return vendor + key[0].toUpperCase() + key.substr(1) + suffixName[0].toUpperCase() + suffixName.substr(1)
  }
}

export const cssTransform = getCssName('transform')
export const transitionend = getEventName('transitionend')
export const animationend = getEventName('animationend')
