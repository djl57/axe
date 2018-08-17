import utils from '@/common'
import './style.css'

document.getElementById('root').innerHTML = '<h1>Hello, fle-cli.</h1>'

/* eslint-disable no-unused-vars */
// const obj = {
//   id: 1,
//   name: 'yourname',
//   children: {
//     id: 11,
//     desc: 'babababa....',
//     node: document.createElement('div')
//   }
// }
// const arr = [1, 2, 3, 4, 5, 6]
// const likeArray = {
//   0: '000',
//   1: 1,
//   2: 'yourname',
//   3: {
//     id: 3
//   },
//   length: 4
// }
// const date = new Date()
// const url = 'https://www.google.com/search?newwindow=1&safe=active&ei=GG11W5KUC4edhwOxi7GwDA&q=css3js%E5%89%8D%E7%BC%80&oq=css3js%E5%89%8D%E7%BC%80&gs_l=psy-ab.3...348485.348605.0.348878.2.2.0.0.0.0.154.154.0j1.1.0....0...1.1.64.psy-ab..1.0.0....0.OeOGYl859hE'

/* eslint-disable no-console */
console.log(utils)

// console.group('ua')
// console.log('Trident', utils.Trident)
// console.log('Webkit', utils.Webkit)
// console.log('Gecko', utils.Gecko)
// console.log('Mobile', utils.Mobile)
// console.log('Ios', utils.Ios)
// console.log('Android', utils.Android)
// console.log('IPhone', utils.IPhone)
// console.log('IPhoneX', utils.IPhoneX)
// console.log('IPad', utils.IPad)
// console.log('Safari', utils.Safari)
// console.log('Weixin', utils.Weixin)
// console.log('PhoneQQ', utils.PhoneQQ)
// console.log('QQBrowser', utils.QQBrowser)
// console.log('NeteaseComic', utils.NeteaseComic)
// console.log('NeteaseSnail', utils.NeteaseSnail)
// console.groupEnd()

// console.group('data')
// console.log('getDeepData', utils.getDeepData(obj, 'children.node.tagName', 'NONE'))
// console.log('parseJSON', utils.parseJSON(JSON.stringify(obj)))
// console.log('toArray', utils.toArray(likeArray))
// console.log('fillArray', utils.fillArray(1, 10))
// console.log('randomArray', utils.randomArray(arr, 3))
// console.groupEnd()

// console.group('date')
// console.log('formatDate', utils.formatDate(date))
// console.log('parseDate', utils.parseDate(date.getTime() + 3600 * 24 * 30 * 1000))
// console.log('getDateTextAgo', utils.getDateTextAgo(date.getTime() - 3600 * 24 * 30 * 1000))
// console.groupEnd()

// console.group('func')
// console.log('requestAF')
// console.log('cancelAF')
// console.log('loopAF')
// console.log('debounce')
// console.log('throttle')
// console.log('copy')
// console.groupEnd()

// console.group('is')
// console.log('getRealType', utils.getRealType(obj))
// console.log('isObject', utils.isObject(obj))
// console.log('isArray', utils.isArray(arr))
// console.log('isFunction', utils.isFunction(() => {}))
// console.log('isBoolean', utils.isBoolean(true))
// console.log('isNumber', utils.isNumber(1))
// console.log('isString', utils.isString('s'))
// console.log('isUndef', utils.isUndef(obj.aa))
// console.log('isElement', utils.isElement(obj.children.node))
// console.log('isDate', utils.isDate(date))
// console.log('isFormData', utils.isFormData(new window.FormData()))
// console.log('isPrimitive', utils.isPrimitive(''))
// console.log('isValid', utils.isValid(null))
// console.log('isEmpty', utils.isEmpty({}))
// console.log('isSameType', utils.isSameType(new Date(), date))
// console.groupEnd()

// console.group('store')
// console.log('setCookie', utils.setCookie('test', 'value', {
//   expires: Date.now() + 3600 * 1000,
//   path: '/'
// }))
// console.log('getCookie', utils.getCookie('test'))
// console.log('removeCookie', utils.removeCookie('test'))
// console.log('setStorage', utils.setStorage('test', obj))
// console.log('getStorage', utils.getStorage('test', 'Object'))
// console.log('removeStorage', utils.removeStorage('test'))
// console.groupEnd()

// console.group('style')
// console.log('getStyleName', utils.getStyleName('transform'))
// console.log('getCssName', utils.getCssName('transform'))
// console.groupEnd()

// console.group('url')
// console.log('encodeUrl')
// console.log('decodeUrl')
// console.log('getQueryString', utils.getQueryString('safe', url))
// console.log('toQueryString', utils.toQueryString({ id: 1, name: 'nickname' }))
// console.log('parseQueryString', utils.parseQueryString(url, true))
// console.log('formatUrl', utils.formatUrl(url, { id: 9999 }))
// console.log('parseUrl', utils.parseUrl(url))
// // console.log('redirect', utils.redirect('/'))
// console.groupEnd()
