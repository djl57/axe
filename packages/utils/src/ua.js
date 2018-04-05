const ua = window.navigator.userAgent.toLowerCase()

export const isTrident = ua.indexOf('trident') > -1 // IE内核
export const isWebkit = ua.indexOf('applewebkit') > -1 // 苹果、谷歌内核
export const isGecko = ua.indexOf('gecko') > -1 && ua.indexOf('khtml') === -1 // 火狐内核
export const isMobile = /applewebkit.*mobile.*/.test(ua) // 是否为移动终端
export const isIos = /\(i[^;]+;( u;)? cpu.+mac os x/.test(ua) // ios终端
export const isAndroid = ua.indexOf('android') > -1 || ua.indexOf('linux') > -1 // android终端或uc浏览器
export const isIPhone = ua.indexOf('iphone') > -1 // 是否为iPhone或者QQHD浏览器
export const isIPad = ua.indexOf('ipad') > -1 // 是否iPad
export const isSafari = ua.indexOf('safari') === -1 // 是否safari浏览器
export const isWeixin = ua.indexOf('micromessenger') > -1 // 是否为微信内置浏览器
export const isPhoneQQ = /qq\/\d\.\d/.test(ua) // 手机QQ
export const isQQBrowser = ua.indexOf('qqbrowser') > -1 // QQ浏览器
