# utils

[![version](https://img.shields.io/npm/v/@axe/utils.svg)](https://www.npmjs.org/package/@axe/utils)

A common utils of javascript.

## API

### userAgent（设备判断）[常量]

移动端设备

* Mobile: 移动终端
* Ios: ios终端
* Android: android终端
* IPhone: iPhone终端
* IPhoneX: IPhoneX
* IPad: iPad

浏览器内核

* Trident: IE内核
* Webkit: 苹果、谷歌内核
* Gecko: 火狐内核

浏览器

* Safari: safari浏览器
* Weixin: 微信内置浏览器
* PhoneQQ: 手机QQ
* QQBrowser: QQ浏览器

网易App

* NeteaseComic: 网易漫画app
* NeteaseSnail: 网易蜗牛阅读app

### is（类型判断）

* getRealType：获取真实的类型
* isObject：是否为对象
* isArray：是否为数组（也属于对象，若要区分优先判断数组再判断对象）
* isFunction：是否为函数
* isBoolean：是否为布尔类型（即true或false）
* isNumber：是否为数字（字符串数字返回false）
* isString：是否为字符串
* isUndef：是否为undefined
* isElement：是否为DOM节点
* isDate：是否为日期对象
* isFormData：是否为FormData格式
* isValid：是否为有效值（null或undefined为false）
* isPrimitive：是否为数字或字符串
* isEmpty：是否为空（空数组、空对象，返回true）
* isSameType：两个值的类型是否相同

### date（时间&日期处理）

* formatDate (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss')：格式化日期，转为字符串形式
* parseDate (t)：转为日期对象
  * t：时间戳或fmt（参考上述fmt示例）
* getTextAgo (d)：将时间转为文字描述
  * d：日期对象、时间戳或fmt，转换规则：
    * 刚刚（一分钟内）
    * x分钟前
    * 今天 x时x分
    * 明天 x时x分
    * 前天 x时x分
    * x月x日（今年）
    * x年x月x日

### url（路由处理）

* encodeUrl (url)：加密url
* decodeUrl (url)：解密url
* getQueryString (name, url = window.location.search, decode = false)：获取url中的参数
  * name：获取的名称
  * url：从这个url中获取
  * decode：是否需要解密
* toQueryString (params, encode = false)：将对象格式转换为url的query
* parseQueryString (url = window.location.search, decode = true)：将url中的所有参数解析为一个对象
* formatUrl (url, params, encode = false)：将参数追加到url后面
* parseUrl (url)：将url转换成对象格式，形如`location`，返回值有：
  * hash
  * host
  * hostname
  * href
  * origin
  * pathname
  * port
  * protocol
  * search
* redirect (url, params, options)：页面跳转
  * url：要跳转的地址
  * params：query参数
  * options.type：类型，可选项
    * self：当前窗口打开页面，保留历史记录
    * replace：当前窗口打开页面，替换历史记录
    * blank：新窗口打开页面

### data（数据转换）

* getDeepData (data, chain, dft)：获取对象的深层值，防止报错
  * data：原始对象
  * chain：需要取值的链，如：`time.start`，表示取`data.time.start`的值
  * dft：若不存在则返回该值
* parseJSON (str)：字符串转为json对象
* toArray (args, start = 0)：类数组转换为数组，可以调用数组方法
* fillArray (start, end)：按照数字顺序填充数组，如：fillArray(1, 100)，则返回一个包含1～100的数组
* randomArray (array, count)：将数组打乱，返回一个新数组，第二个参数可以设置新数组的长度

### func（常用函数）

* debounce (fn, wait = 100, maxWait)：防抖，即频繁操作，只触发最后一次操作
  * fn：回调方法
  * wait：防抖时间
  * maxWait：最大时间限制，超过该时间必触发一次，不设置则忽略
* throttle (fn, wait = 100, trailing)：截流，即一段时间频繁操作，只触发一次
  * fn：回调方法
  * wait：防抖时间
  * trailing：是否进行延迟触发，默认是
* copy (text)：复制文本到剪贴板，该兼容性不是很好
  * text：要复制的文本

### dom

* getElement (el, parent = document)：获取节点
  * el：字符串或节点
  * parent：在父级节点查找
* getElementList (els, parent = document)：获取多个节点
* createEvent (eventName = 'click')：创建自定义事件
* dispatchEvent (e, ev)：触发自定义事件
* getOffsetFromDoc (el)：获取节点基于当前视窗掉偏移位置
  * 返回值：{ top, left }
* getScrollFromDoc (el)：获取节点基于当前视窗掉滚动位置
  * 返回值：{ top, left }

### style

* getVendorName (name)：获取css属性的浏览器前缀
* getStyleName (name)：判断是否需要前缀并获取style名称
* getCssName (name)：判断是否需要前缀并获取css名称
* getEventName (name)：判断是否需要前缀并获取event名称，如transitionend、animationend等
* getMatrixTranslate (computedStyle)：获取当前的translate值，如果是在过渡动画中，也可以实时获取
  * computedStyle: 通过window.getComputedStyle(el, null)获取

### store

* getCookie (name)：获取cookie
* setCookie (name, value, options = {})：设置cookie
  * options:
    * expires：时间戳或者格式化时间字符串'2018-09-09 08:08'，cookie过期的日期，如果没有定义，cookie会在对话结束时过期
    * path: path=path (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径
    * domain：指定域(例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com') 如果没有定义，默认为当前文档位置的路径的域名部分。
    * max-age：文档被查看后cookie过期时间，单位为秒
    * secure： cookie只会被https传输 ，即加密的https链接传输
* removeCookie (name)：删除cookie
* getStorage (key, type)：获取localStorage
  * type：转换结果值，'Object'、'Boolean'、'Number'
* setStorage (key, value)：设置localStorage
  * value：可以是对象，会自动转换为字符串储存
* removeStorage (key, type)：删除localStorage

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
