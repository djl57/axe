// 获取真实的类型
export function getRealType (t) {
  let str = Object.prototype.toString.call(t)
  return str.substring(8, str.length - 1)
}

/**
 * 是否为对象
 * @param {any} t
 * @param {boolean} [includeArray=false] 是否包含数组
 * @returns {boolean}
 */
export function isObject (t) {
  return t && typeof t === 'object'
}

/**
 * 判断是否为数组
 * @param {any} t
 * @returns {boolean}
 */
export function isArray (t) {
  if (Array.isArray) {
    return Array.isArray(t)
  }

  return getRealType(t) === 'Array'
}

/**
 * 判断是否为函数
 * @param {any} t
 * @returns {boolean}
 */
export function isFunction (t) {
  return typeof t === 'function'
}

/**
 * 判断是否为布尔类型
 * @param {any} t
 * @returns {boolean}
 */
export function isBoolean (t) {
  return typeof t === 'boolean'
}

/**
 * 判断是否为数字
 * @param {any} t
 * @returns {boolean}
 */
export function isNumber (t) {
  return typeof t === 'number'
}

/**
 * 判断是否为字符串
 * @param {any} t
 * @returns {boolean}
 */
export function isString (t) {
  return typeof t === 'string'
}

/**
 * 判断值是否定义
 * @param {any} t
 * @returns {boolean}
 */
export function isUndef (t) {
  return typeof t === 'undefined'
}

// 判断是否为dom元素
export function isElement (node) {
  if (window.HTMLElement) {
    return node instanceof window.HTMLElement
  }

  return node && node.nodeType === 1 && isString(node.nodeName)
}

// 判断是否为日期对象
export function isDate (d) {
  return d instanceof Date
}

/**
 * 判断是否为FormData
 * @param {any} t
 * @returns {boolean}
 */
export function isFormData (data) {
  return window.FormData && data instanceof window.FormData
}

/**
 * 判断值是否有效
 * undefined、null, 空字符串，都表示无效
 * @param {any} t
 * @returns {boolean}
 */
export function isValid (t) {
  return t != null && t !== ''
}

/**
 * 判断是否为字符串或数字
 * @param {any} t
 * @returns {boolean}
 */
export function isPrimitive (t) {
  return isString(t) || isNumber(t)
}

/**
 * 判断值是否为空
 * 空数组、空对象、其他类型，都表示为空
 * @param {any} t
 * @returns {boolean}
 */
export function isEmpty (t) {
  if (isArray(t)) {
    return t.length === 0
  }

  if (isObject(t)) {
    return Object.keys(t).length === 0
  }

  return !isValid(t)
}

// 判断是否为相同类型
export function isSameType (t1, t2) {
  return getRealType(t1) === getRealType(t2)
}
