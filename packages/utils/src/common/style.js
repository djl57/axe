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
  let vendor = getVendorName(name)
  return !vendor ? name : vendor + name[0].toUpperCase() + name.substr(1)
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
