import { isObject, isString } from './is'

/**
 * 获取嵌套的值
 * @param {object|array} data
 * @param {string} chain
 * @param {any} [dft=undefined]
 * @returns {any}
 */
export function getValue (data, chain, dft) {
  let d = data
  let ss = chain.split('.')
  let s = ss.shift()

  while (s && d != null) {
    d = d[s]
    s = ss.shift()
  }

  return (!s && typeof d !== 'undefined') ? d : dft
}

/**
 * 转换为json对象
 * @param {any} value
 * @returns {object}
 */
export function parseJSON (val) {
  if (isString(val)) {
    try {
      val = JSON.parse(val)
    } catch (err) {
      console.warn(err)
      val = null
    }

    return val
  }

  if (isObject(val)) {
    return val
  }

  return null
}

/**
 * 类数组转换为数组
 * @param {any} args
 * @param {any} start=0
 * @returns {array}
 */
export function toArray (args, start = 0) {
  return Array.prototype.slice.call(args, start)
}

/**
 * 按数字顺序生成数组
 * @param {any} args
 * @returns {array}
 */
export function fillArray (start, end) {
  let result = []

  if (start < end) {
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
  } else {
    for (let i = start; i >= end; i--) {
      result.push(i)
    }
  }

  return result
}

export function randomArray (arr, count = arr.length) {
  let newArr = []
  let randomIndex

  while (arr.length > 0 && newArr.length < count) {
    randomIndex = Math.ceil(Math.random() * arr.length) - 1
    newArr.push(arr.splice(randomIndex, 1)[0])
  }

  return newArr
}
