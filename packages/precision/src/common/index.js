// 数据纠正
export function strip (num, precision = 12) {
  return parseFloat((+num).toPrecision(precision))
}

// 获取小数点的长度
export function getDecimalLength (num) {
  let es = ('' + num).split('e')
  let len = (es[0].split('.')[1] || '').length - (+es[1] || 0)
  return len > 0 ? len : 0
}

// 将浮点数转为整数
export function float2Int (num) {
  let numStr = '' + num

  if (numStr.indexOf('e') === -1) {
    return +(numStr.replace('.', ''))
  } else {
    return +num * Math.pow(10, getDecimalLength(num))
  }
}

// 检测是否超过安全数值
export function checkBoundary (num) {
  if (+num > Number.MAX_SAFE_INTEGER || +num < Number.MIN_SAFE_INTEGER) {
    console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`)
    return true
  }
  return false
}

// 精确乘法
export function times (n1, n2, ...others) {
  if (others.length > 0) {
    return times(times(n1, n2), others[0], others.slice(1))
  }

  let value = float2Int(n1) * float2Int(n2)

  checkBoundary(value)

  return value / Math.pow(10, getDecimalLength(n1) + getDecimalLength(n2))
}

// 精确除法
export function divide (n1, n2, ...others) {
  if (others.length > 0) {
    return divide(divide(n1, n2), others[0], others.slice(1))
  }

  let n1Int = float2Int(n1)
  let n2Int = float2Int(n2)

  checkBoundary(n1Int)
  checkBoundary(n2Int)

  return times(n1Int / n2Int, Math.pow(10, getDecimalLength(n2) - getDecimalLength(n1)))
}

// 精确加法
export function plus (n1, n2, ...others) {
  if (others.length > 0) {
    return plus(plus(n1, n2), others[0], others.slice(1))
  }

  let baseNum = Math.pow(10, Math.max(getDecimalLength(n1), getDecimalLength(n2)))

  return (times(n1, baseNum) + times(n2, baseNum)) / baseNum
}

// 精确减法
export function minus (n1, n2, ...others) {
  if (others.length > 0) {
    return minus(minus(n1, n2), others[0], others.slice(1))
  }

  let baseNum = Math.pow(10, Math.max(getDecimalLength(n1), getDecimalLength(n2)))

  return (times(n1, baseNum) - times(n2, baseNum)) / baseNum
}

// 精确四舍五入
export function round (n, precision = 0) {
  let baseNum = Math.pow(10, precision)
  return divide(Math.round(times(n, baseNum)), baseNum)
}

export default {
  strip,
  getDecimalLength,
  float2Int,
  checkBoundary,
  times,
  divide,
  plus,
  minus,
  round
}
