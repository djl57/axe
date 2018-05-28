# lazy-load-img

[![version](https://img.shields.io/npm/v/@axe/lazy-load-img.svg)](https://www.npmjs.org/package/@axe/lazy-load-img)

A library of lazy load image when it is necessary.

## Usage

```js
import lazyLoadImg from '@axe/lazy-load-img'

const clientWidth = document.documentElement.clientWidth

const lazy = lazyLoadImg({
  el: '#root',
  lazyOffsetTop: 500,
  maxInterval: 1000,
  placeholderImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg',
  onImgLoad (img, w, h) {
    img.style.width = clientWidth + 'px'
    img.style.height = (clientWidth * h / w) + 'px'
  }
})

// when new img is append, query img again.
// lazy.init()

// trigger img render by yourself
// lazy.update()
```

```html
<div id="root">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737689&di=a79f9474b9f6cc0214eab838e0bde792&imgtype=0&src=http%3A%2F%2Fi4.download.fd.pchome.net%2Fg1%2FM00%2F12%2F04%2FoYYBAFZS2uaIR_NiADNPLO6oiewAACx_gAAyJkAM09E943.jpg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737689&di=abe6d3c80becf701290827252b9d6802&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201402%2F22%2F221511qk8efdidtf3ftqez.jpg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737689&di=64bae06f399df98ca7ec0932eb9c08b1&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201212%2F14%2F20121214223133_jYzPn.jpeg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737688&di=f5fac86ad1b0e9e37f46a647ca981a92&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F35a85edf8db1cb1353fd8b78de54564e93584bc0.jpg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737688&di=c20cb964c24d5832e6a61e6ee39883c5&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201212%2F14%2F20121214224334_wdc3v.jpeg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737687&di=2a92f3b107ac92dce2df419c6fe0f4bd&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201402%2F21%2F120044k1dgtgc4dg2dm5tw.jpg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737687&di=c6d6faaf0ac9fc41fd57cbe8b1b58ec8&imgtype=0&src=http%3A%2F%2Fattimg.dospy.com%2Fimg%2Fday_120403%2F20120403_ff7d00e3c8890ac99d0ft829Pq8AcoeE.jpg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822872691&di=2bbd39ca36324c424358651550aefe88&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1726406314%2C3724043308%26fm%3D214%26gp%3D0.jpg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737686&di=ccef9ebafd31343b381b4fed3dd158d4&imgtype=0&src=http%3A%2F%2Fattimg.dospy.com%2Fimg%2Fday_120721%2F20120721_b827a9d749e4d5da6bf6686626zZVAXV.jpg">
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522823157174&di=1e111a44baa77ea6c6940bac60418607&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522822737686&di=f11edc29433a97ef738b1cadd0379a17&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1308%2F13%2Fc0%2F24431877_1376375393214.jpg">
</div>
```

# API

### lazyLoadImg

options

* el: [HTMLElement|string] -> '#id', '.class'
* lazyOffsetTop = 0: [number] load img when scrollTop less than view area
* maxInterval = 1000: [number] we have throttle scroll function, when you are scrolling until maxInterval, it will be trigger
* placeholderImg: [string] ensure placeholderImg already loaded before load real img
* onImgLoad: [function] when a img loaded, it will be trigger
  * img: HTMLElement
  * originalWidth: img width
  * originalHeight: img height

### lazyLoadImg.init

when new img is append, init and new img will be render on necessary.

### lazyLoadImg.update

render img by yourself, but as usual you needn't use it, because it is automatic.

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
