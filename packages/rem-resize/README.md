# rem-resize

[![version](https://img.shields.io/npm/v/@axe/rem-resize.svg)](https://www.npmjs.org/package/@axe/rem-resize)

A flexible rem layout for h5.

# Usage

It compiled with iife, so when you import and it will be work.

I recommend inject it at head so that it will be work before html rendered.

And load by cdn is a good idea.

```html
<head>
  ...
  <script src="https://easyread.nosdn.127.net/fle/a0df1d4009c7a2ec5fee/1522807676716/lib/index.js"></script>
  <link rel="stylesheet" href="https://easyread.nosdn.127.net/fle/a0df1d4009c7a2ec5fee/1522807676716/lib/style.css">
  ...
</head>
```

# API

By default, 1rem = 50px, you can also set it by yourself before loaded.

* window.__MAX_WIDTH__ = 750 [fixed width if screen is very large]
* window.__DIV_PART__ = 15   [It means 1rem = (750 / 15)px]
* window.__BODY_SIZE__ = 12  [set body's font-size]

methods

* window.px2rem (number|number+px)
* window.rem2px (number|number+rem)

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).
