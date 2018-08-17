const element = document.createElement('div')
const style = element.style
const prefixes = {
  webkit: 'Webkit',
  moz: 'Moz',
  o: 'O',
  ms: 'ms'
}
const eventPrefixes = {
  webkit: 'webkit',
  moz: '',
  o: 'o',
  ms: 'MS'
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

// 判断是否需要前缀并获取css名称
export function getCssName (name) {
  if (name.indexOf('-') !== -1) {
    name = name.replace(/-[a-z]/g, s => s[1].toUpperCase())
  }

  if (!cache[name]) {
    getStyleName(name)
  }

  if (!cache[name].css) {
    cache[name].css = (cache[name].prefix ? '-' + cache[name].prefix + '-' : '') + name.replace(/[A-Z]/g, s => '-' + s.toLowerCase())
  }

  return cache[name].css
}

// 判断是否需要前缀并获取event名称，如：transitionend、animationend等
export function getEventName (name) {
  if (cache[name]) {
    return cache[name].event
  }

  let key

  if (name.indexOf('transition') === 0) {
    key = 'transition'
  } else if (name.indexOf('animation') === 0) {
    key = 'animation'
  }

  if (!key) {
    return name
  }

  if (!cache[key]) {
    getStyleName(key)
  }

  let prefix = eventPrefixes[cache[key].prefix]
  let eventName = !prefix ? name : prefix + key[0].toUpperCase() + name.substr(key.length)[0].toUpperCase()

  cache[name] = {
    event: eventName
  }

  return eventName
}

// 获取当前的translate值，如果是在过渡动画中，也可以实时获取
export function getMatrixTranslate (computedStyle) {
  let matched = computedStyle.transform.match(/\((.+)\)/)

  if (matched && matched[1]) {
    let arr = matched[1].split(', ')

    if (arr.length === 6) {
      return {
        x: +arr[4],
        y: +arr[5],
        z: 0
      }
    } else {
      return {
        x: +arr[12],
        y: +arr[13],
        z: +arr[14]
      }
    }
  }

  return {
    x: 0,
    y: 0,
    z: 0
  }
}
