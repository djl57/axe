import { isString, isNumber, isDate } from './is'

export function formatDate (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
  const M = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  return fmt
    .replace('yyyy', date.getFullYear())
    .replace('MM', M > 9 ? M : '0' + M)
    .replace('dd', d > 9 ? d : '0' + d)
    .replace('hh', h > 9 ? h : '0' + h)
    .replace('mm', m > 9 ? m : '0' + m)
    .replace('ss', s > 9 ? s : '0' + s)
}

// t: 字符串或时间戳
export function parseDate (t) {
  if (isString(t)) {
    if (+t > 0) {
      return new Date(+t)
    }

    return new Date(t.replace(/-/g, '/'))
  }

  if (isNumber(t)) {
    return new Date(t)
  }

  if (isDate(t)) {
    return t
  }

  return new Date()
}

// 多久以前
export function getDateTextAgo (d) {
  if (!isDate(d)) {
    d = parseDate(d)
  }

  let now = new Date()
  let diff = (now - d) / 1000
  let tdiff = Math.round(diff)
  let hours, days

  if (tdiff < 60) {
    return '刚刚'
  }

  diff /= 60
  tdiff = Math.round(diff)

  if (tdiff < 60) {
    return tdiff + '分钟前'
  }

  diff /= 60
  tdiff = Math.floor(diff)

  let hh = d.getHours()
  let mm = d.getMinutes()
  hours = (hh > 9 ? hh : '0' + hh) + ':' + (mm > 9 ? mm : '0' + mm)

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
