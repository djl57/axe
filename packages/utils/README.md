# utils

[![version](https://img.shields.io/npm/v/@axe/utils.svg)](https://www.npmjs.org/package/@axe/utils)

A common utils of javascript.
## API

### userAgent（设备判断）

* isTrident：IE内核
* isWebkit：webkit内核
* isGecko：Firefox内核
* isMobile：移动设备
* isIos：ios设备
* isAndroid：安卓设备
* isIPhone：iPhone设备
* isIPad：iPad设备
* isSafari：safari浏览器
* isWeixin：微信内置浏览器
* isPhoneQQ：手机QQ内置浏览器
* isQQBrowser：QQ浏览器

### is（类型判断）

* isObject：是否为对象
* isArray：是否为数组（也属于对象，若要区分优先判断数组再判断对象）
* isFunction：是否为函数
* isBoolean：是否为布尔类型（即true或false）
* isNumber：是否为数字（字符串数字返回false）
* isString：是否为字符串
* isFormData：是否为FormData格式
* isValid：是否为有效值（null或undefined为false）
* isDefined：是否定义过（undefined为false）
* isPrimitive：是否为数字或字符串
* isEmpty：是否为空（空数组、空对象，返回true）
* isSameType：两个值的类型是否相同
* isElement：是否为DOM节点
* isDate：是否为日期对象

### time（时间&日期处理）

* formatDate (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss')：格式化日期，转为字符串形式
* parseDate (t)：转为日期对象
  * t：时间戳或fmt（参考上述fmt示例）
* timeAgoText (d)：将时间转为文字藐视
  * d：日期对象、时间戳或fmt，转换规则：
    * x秒前
    * x分钟前
    * 今天 x时x分
    * 明天 x时x分
    * 前天 x时x分
    * x月x日（今年）
    * x年x月x日

### url（路由处理）

* encodeURL (url)：加密url
* decodeURL (url)：解密url
* getQuery (name, url = window.location.search, decode = true)：获取url中的参数
  * name：获取的名称
  * url：从这个url中获取
  * decode：是否需要解密，默认是
* toQuery (params, encode = true)：将对象格式转换为url的query
* parseQuery (url = window.location.search, decode = true)：将url中的所有参数解析为一个对象
* appendQuery (url, params, encode = true)：将参数追加到url后面
* parseURL (url)：将url转换成对象格式，形如`location`，返回值有：
  * hash
  * host
  * hostname
  * href
  * origin
  * pathname
  * port
  * protocol
  * search
* redirect (url, params, type)：页面跳转
  * url：要跳转的地址
  * params：query参数
  * type：类型，可选项：
    * self：当前窗口打开页面，保留历史记录
    * replace：当前窗口打开页面，替换历史记录
    * blank：新窗口打开页面

### transform（数据转换）

* getValue (data, chain, dft)：获取对象的深层值，防止报错
  * data：原始对象
  * chain：需要取值的链，如：`time.start`，表示取`data.time.start`的值
  * dft：若不存在则返回该值
* parseJSON (str)：字符串转为json对象
* toArray (args, start = 0)：类数组转换为数组，可以调用数组方法
* fillArray (start, end)：按照数字顺序填充数组，如：fillArray(1, 100)，则返回一个包含1～100的数组

### tool（工具）

* addZero (n)：若数字小于两位数，追加一个0

### method（常用方法）

* debounce (fn, wait = 100, maxWait)：防抖，即频繁操作，只触发最后一次操作
  * fn：回调方法
  * wait：防抖时间
  * maxWait：最大时间限制，超过该时间必触发一次，不设置则忽略
* throttle (fn, wait = 100, trailing)：截流，即一段时间频繁操作，只触发一次
  * fn：回调方法
  * wait：防抖时间
  * trailing：延迟结束后是否再触发一次，默认不触发
* copy (text)：复制文本到剪贴板，该兼容性不是很好
  * text：要复制的文本

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
