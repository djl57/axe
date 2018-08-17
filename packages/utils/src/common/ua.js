const ua = window.navigator.userAgent.toLowerCase()

// 浏览器内核
export const Trident = ua.indexOf('trident') > -1 // IE内核
export const Webkit = ua.indexOf('applewebkit') > -1 // 苹果、谷歌内核
export const Gecko = ua.indexOf('gecko') > -1 && ua.indexOf('khtml') === -1 // 火狐内核

// 移动端设备
export const Mobile = /applewebkit.*mobile.*/.test(ua) // 是否为移动终端
export const Ios = /\(i[^;]+;( u;)? cpu.+mac os x/.test(ua) // ios终端
export const Android = ua.indexOf('android') > -1 // android终端
export const IPhone = ua.indexOf('iphone') > -1 // 是否为iPhone或者QQHD浏览器
export const IPhoneX = IPhone && window.screen.height === 812 && window.screen.width === 375 // IPhoneX
export const IPad = ua.indexOf('ipad') > -1 // 是否iPad

// 浏览器
export const Safari = ua.indexOf('safari') === -1 // 是否safari浏览器
export const Weixin = ua.indexOf('micromessenger') > -1 // 是否为微信内置浏览器
export const PhoneQQ = /qq\/\d\.\d/.test(ua) // 手机QQ
export const QQBrowser = ua.indexOf('qqbrowser') > -1 // QQ浏览器

// 网易App
export const NeteaseComic = ua.indexOf('neteasecomic') !== -1 // 网易漫画app
export const NeteaseSnail = ua.indexOf('neteasesnailreader') !== -1 // 网易蜗牛阅读app
