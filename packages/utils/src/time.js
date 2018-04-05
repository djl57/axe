import { isString, isNumber, isDate } from './is'
import { addZero } from './helper'

export function formatDate (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
  let o = {
    MM: date.getMonth() + 1,
    dd: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  }

  fmt = fmt.replace('yyyy', date.getFullYear())

  Object.keys(o).forEach(k => {
    fmt = fmt.replace(k, addZero(o[k]))
  })

  return fmt
}

// t: 字符串或时间戳
export function parseDate (t) {
  if (isString(t)) {
    return new Date(t.replace(/-/g, '/'))
  }

  if (isNumber(t)) {
    return new Date(t)
  }

  return new Date()
}

// 多久以前
export function timeAgoText (d) {
  if (!isDate(d)) {
    d = parseDate(d)
  }

  let now = new Date()
  let diff = (now - d) / 1000
  let tdiff = Math.round(diff)
  let hours, days

  if (tdiff < 60) {
    return tdiff + '秒前'
  }

  diff /= 60
  tdiff = Math.round(diff)

  if (tdiff < 60) {
    return tdiff + '分钟前'
  }

  diff /= 60
  tdiff = Math.floor(diff)
  hours = addZero(d.getHours()) + ':' + addZero(d.getMinutes())

  if (tdiff <= now.getHours()) {
    return '今天 ' + hours
  } else if (tdiff <= now.getHours() + 24) {
    return '昨天 ' + hours
  } else if (tdiff <= now.getHours() + 48) {
    return '前天 ' + hours
  }

  days = (d.getMonth() + 1) + '月' + d.getDate() + '日'

  if (d.getFullYear() === now.getFullYear()) {
    return days + ' ' + hours
  }

  return d.getFullYear() + '年' + days + ' ' + hours
}