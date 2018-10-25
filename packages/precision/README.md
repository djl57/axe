# precision

[![version](https://img.shields.io/npm/v/@axe/precision.svg)](https://www.npmjs.org/package/@axe/precision)

浮点精度计算处理，用于处理数字计算过程中精度丢失的问题，如：0.1+0.2=0.3，但是在js计算会丢失精度，变成0.30000000000000004

![](https://raw.githubusercontent.com/ansenhuang/axe/master/packages/precision/doc/preview.png)

## API

### times(n1, n2, ...)

精确乘法

### divide(n1, n2, ...)

精确除法

### plus(n1, n2, ...)

精确加法

### minus(n1, n2, ...)

精确减法

### round(n, precision=0)

精确四舍五入，第二个参数设置精度

### strip(n, precision=12)

数据纠正

### getDecimalLength(n)

获取浮点数n的小数点位数

### float2Int(n)

将浮点数转换为整数

### checkBoundary(n)

检测数字是否超出安全边界，返回true则表示已超过安全数

## 环境配置

构建工具

``` bash
$ npm install -g fle-cli

# yarn
$ yarn global add fle-cli
```

命令说明

```bash
# 本地开发
fle dev

# 代码构建
fle build
```

查看更多说明： [构建文档](https://www.npmjs.com/package/fle-cli)
