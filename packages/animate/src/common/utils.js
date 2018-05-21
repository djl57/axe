const htmlStyle = document && document.documentElement.style
const prefixes = ['webkit', 'moz', 'ms', 'o']
const knownStyle = {}

export function getProperty (name) {
  if (!htmlStyle) {
    return name
  }

  if (knownStyle[name]) {
    return knownStyle[name]
  }

  if (name in htmlStyle) {
    knownStyle[name] = name
    return name
  }

  // 首字母大写
  let upperName = name[0].toUpperCase() + name.substr(1)

  // 前缀判断
  for (let i = 0; i < 4; i++) {
    let realName = prefixes[i] + upperName

    if (realName in htmlStyle) {
      knownStyle[name] = realName
      return realName
    }
  }

  // 都不支持则返回原值
  knownStyle[name] = name
  return name
}
