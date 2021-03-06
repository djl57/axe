# tips

[![version](https://img.shields.io/npm/v/@axe/tips.svg)](https://www.npmjs.org/package/@axe/tips)

## Api

### tips.show(options, b, c)

**options**

* zIndex: 层级
* content: 文本内容
* contentHtml: html内容
* duration = 1500: 显示的时间

*备注：*

* 若options是一个对象，则第二个参数为回调函数（callback）
* 若options是一个字符串，则第一个参数为content，第二个、第三个参数分别为duration和callback（取决于他们的类型）

### tips.hide()

关闭提示

### export Tips(el)

导出Tips，可以自行实例化一个新的提示，默认将DOM节点追加到body中

## Build Setup

``` bash
# serve with hot reload at localhost:5000
fle dev

# build for production with minification
fle build
```

For detailed explanation, consult the [docs for fle-cli](https://www.npmjs.com/package/fle-cli).

## 补充

**图标提示示例**

```js
import tips from '@axe/tips'

tips.show({
  contentHtml: '<i class="icon icon-loading"></i><p class="icon-text">加载中</p>',
  duration: 3000
}, () => {
  console.info('loading end')
})
```

```css
.icon {
  display: block;
  width: 76rpx;
  height: 76rpx;
  margin: 35rpx auto 22rpx;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100%;

  &-text {
    margin-bottom: 25rpx;
  }

  &-loading {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=);
    animation: loading 1s steps(12, end) infinite;
  }

  &-success {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTM4NzQzMjMyNDE5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ4NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDk2MEMyNjQuOTYgOTYwIDY0IDc1OS4wNCA2NCA1MTJTMjY0Ljk2IDY0IDUxMiA2NHM0NDggMjAwLjk2IDQ0OCA0NDhTNzU5LjA0IDk2MCA1MTIgOTYwek01MTIgMTI4LjI4OEMzMDAuNDE2IDEyOC4yODggMTI4LjI4OCAzMDAuNDE2IDEyOC4yODggNTEyYzAgMjExLjU1MiAxNzIuMTI4IDM4My43MTIgMzgzLjcxMiAzODMuNzEyIDIxMS41NTIgMCAzODMuNzEyLTE3Mi4xNiAzODMuNzEyLTM4My43MTJDODk1LjcxMiAzMDAuNDE2IDcyMy41NTIgMTI4LjI4OCA1MTIgMTI4LjI4OHoiIHAtaWQ9IjQ4NzMiIGZpbGw9IiNFOUU5RTkiPjwvcGF0aD48cGF0aCBkPSJNNzI2Ljk3NiAzOTMuMTg0Yy0xMi41NDQtMTIuNDQ4LTMyLjgzMi0xMi4zMi00NS4yNDggMC4yNTZsLTIzMy4yOCAyMzUuODQtMTAzLjI2NC0xMDYuMTEyYy0xMi4zNTItMTIuNzA0LTMyLjYwOC0xMi45MjgtNDUuMjQ4LTAuNjQtMTIuNjcyIDEyLjMyLTEyLjk2IDMyLjYwOC0wLjY0IDQ1LjI0OGwxMjYuMDE2IDEyOS41MDRjMC4wNjQgMC4wOTYgMC4xOTIgMC4wOTYgMC4yNTYgMC4xOTIgMC4wNjQgMC4wNjQgMC4wOTYgMC4xOTIgMC4xNiAwLjI1NiAyLjAxNiAxLjk4NCA0LjUxMiAzLjIgNi44OCA0LjU0NCAxLjI0OCAwLjY3MiAyLjI0IDEuNzkyIDMuNTIgMi4zMDQgMy44NzIgMS42IDggMi40IDEyLjA5NiAyLjQgNC4wNjQgMCA4LjEyOC0wLjggMTEuOTY4LTIuMzM2IDEuMjQ4LTAuNTEyIDIuMjA4LTEuNTM2IDMuMzkyLTIuMTc2IDIuNC0xLjM0NCA0Ljg5Ni0yLjUyOCA2Ljk0NC00LjU0NCAwLjA2NC0wLjA2NCAwLjA5Ni0wLjE5MiAwLjE5Mi0wLjI1NiAwLjA2NC0wLjA5NiAwLjE2LTAuMTI4IDAuMjU2LTAuMTkybDI1Ni4yMjQtMjU5LjAwOEM3MzkuNjQ4IDQyNS44NTYgNzM5LjUyIDQwNS42IDcyNi45NzYgMzkzLjE4NHoiIHAtaWQ9IjQ4NzQiIGZpbGw9IiNFOUU5RTkiPjwvcGF0aD48L3N2Zz4=);
  }

  &-error {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTM4NzQzOTcxMzQzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUwOTEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDgzLjJjLTIzNC42NjY2NjcgMC00MjYuNjY2NjY3IDE5Mi00MjYuNjY2NjY3IDQyNi42NjY2NjdzMTkyIDQyNi42NjY2NjcgNDI2LjY2NjY2NyA0MjYuNjY2NjY2IDQyNi42NjY2NjctMTkyIDQyNi42NjY2NjctNDI2LjY2NjY2Ni0xOTItNDI2LjY2NjY2Ny00MjYuNjY2NjY3LTQyNi42NjY2Njd6IG0wIDgxMC42NjY2NjdjLTIxMS4yIDAtMzg0LTE3Mi44LTM4NC0zODRzMTcyLjgtMzg0IDM4NC0zODQgMzg0IDE3Mi44IDM4NCAzODRjMCAyMTMuMzMzMzMzLTE3Mi44IDM4NC0zODQgMzg0eiIgcC1pZD0iNTA5MiIgZmlsbD0iI0U5RTlFOSI+PC9wYXRoPjxwYXRoIGQ9Ik02NzQuMTMzMzMzIDM0NS42Yy04LjUzMzMzMy04LjUzMzMzMy0yMS4zMzMzMzMtOC41MzMzMzMtMjkuODY2NjY2IDBsLTEzNC40IDEzNC40LTEzNC40LTEzNC40Yy04LjUzMzMzMy04LjUzMzMzMy0yMS4zMzMzMzMtOC41MzMzMzMtMjkuODY2NjY3IDAtOC41MzMzMzMgOC41MzMzMzMtOC41MzMzMzMgMjEuMzMzMzMzIDAgMjkuODY2NjY3bDEzNC40IDEzNC40LTEzNC40IDEzNC40Yy04LjUzMzMzMyA4LjUzMzMzMy04LjUzMzMzMyAyMS4zMzMzMzMgMCAyOS44NjY2NjYgNC4yNjY2NjcgNC4yNjY2NjcgMTAuNjY2NjY3IDYuNCAxNC45MzMzMzMgNi40IDYuNCAwIDEwLjY2NjY2Ny0yLjEzMzMzMyAxNC45MzMzMzQtNi40bDEzNi41MzMzMzMtMTM0LjQgMTM0LjQgMTM0LjRjNC4yNjY2NjcgNC4yNjY2NjcgMTAuNjY2NjY3IDYuNCAxNC45MzMzMzMgNi40IDYuNCAwIDEwLjY2NjY2Ny0yLjEzMzMzMyAxNC45MzMzMzQtNi40IDguNTMzMzMzLTguNTMzMzMzIDguNTMzMzMzLTIxLjMzMzMzMyAwLTI5Ljg2NjY2NmwtMTM0LjQtMTM0LjQgMTM0LjQtMTM0LjRjNi40LTguNTMzMzMzIDYuNC0yMS4zMzMzMzMtMi4xMzMzMzQtMjkuODY2NjY3eiIgcC1pZD0iNTA5MyIgZmlsbD0iI0U5RTlFOSI+PC9wYXRoPjwvc3ZnPg==);
  }

  &-info {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTM4NzQ0MzQ3NjA3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUzMTEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDk1OC4wMTZDMjY2LjA4IDk1OC4wMTYgNjUuOTg0IDc1Ny45NTIgNjUuOTg0IDUxMiA2NS45ODQgMjY2LjA4IDI2Ni4wOCA2NS45ODQgNTEyIDY1Ljk4NGMyNDUuOTUyIDAgNDQ2LjAxNiAyMDAuMDY0IDQ0Ni4wMTYgNDQ2LjAxNkM5NTguMDE2IDc1Ny45NTIgNzU3Ljk1MiA5NTguMDE2IDUxMiA5NTguMDE2ek01MTIgMTI5Ljk4NEMzMDEuMzQ0IDEyOS45ODQgMTI5Ljk4NCAzMDEuMzQ0IDEyOS45ODQgNTEyYzAgMjEwLjYyNCAxNzEuMzYgMzgyLjAxNiAzODIuMDE2IDM4Mi4wMTYgMjEwLjYyNCAwIDM4Mi4wMTYtMTcxLjM2IDM4Mi4wMTYtMzgyLjAxNkM4OTQuMDE2IDMwMS4zNDQgNzIyLjYyNCAxMjkuOTg0IDUxMiAxMjkuOTg0eiIgcC1pZD0iNTMxMiIgZmlsbD0iI0U5RTlFOSI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIgMzA0bS00OCAwYTEuNSAxLjUgMCAxIDAgOTYgMCAxLjUgMS41IDAgMSAwLTk2IDBaIiBwLWlkPSI1MzEzIiBmaWxsPSIjRTlFOUU5Ij48L3BhdGg+PHBhdGggZD0iTTUxMiA3NjhjLTE3LjY2NCAwLTMyLTE0LjMwNC0zMi0zMmwwLTI4OGMwLTE3LjY2NCAxNC4zMzYtMzIgMzItMzJzMzIgMTQuMzM2IDMyIDMybDAgMjg4QzU0NCA3NTMuNjk2IDUyOS42NjQgNzY4IDUxMiA3Njh6IiBwLWlkPSI1MzE0IiBmaWxsPSIjRTlFOUU5Ij48L3BhdGg+PC9zdmc+);
  }

  &-question {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTM4NzQ0NDg1NjYyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU1NjYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDc4NC4zNTJtLTQ4IDBhMS41IDEuNSAwIDEgMCA5NiAwIDEuNSAxLjUgMCAxIDAtOTYgMFoiIHAtaWQ9IjU1NjciIGZpbGw9IiNFOUU5RTkiPjwvcGF0aD48cGF0aCBkPSJNNTEyIDk2MEMyNjQuOTYgOTYwIDY0IDc1OS4wNCA2NCA1MTJTMjY0Ljk2IDY0IDUxMiA2NHM0NDggMjAwLjk2IDQ0OCA0NDhTNzU5LjA0IDk2MCA1MTIgOTYwek01MTIgMTI4LjI4OEMzMDAuNDE2IDEyOC4yODggMTI4LjI4OCAzMDAuNDE2IDEyOC4yODggNTEyYzAgMjExLjU1MiAxNzIuMTI4IDM4My43MTIgMzgzLjcxMiAzODMuNzEyIDIxMS41NTIgMCAzODMuNzEyLTE3Mi4xNiAzODMuNzEyLTM4My43MTJDODk1LjcxMiAzMDAuNDE2IDcyMy41NTIgMTI4LjI4OCA1MTIgMTI4LjI4OHoiIHAtaWQ9IjU1NjgiIGZpbGw9IiNFOUU5RTkiPjwvcGF0aD48cGF0aCBkPSJNNTEyIDY3My42OTZjLTE3LjY2NCAwLTMyLTE0LjMzNi0zMi0zMmwwLTU0LjExMmMwLTUyLjM1MiA0MC05Mi4zNTIgNzUuMzI4LTEyNy42NDhDNTgxLjIxNiA0MzQuMDE2IDYwOCA0MDcuMjY0IDYwOCAzODUuOTJjMC01My4zNDQtNDMuMDcyLTk2LjczNi05Ni05Ni43MzYtNTMuODI0IDAtOTYgNDEuNTM2LTk2IDk0LjU2IDAgMTcuNjY0LTE0LjMzNiAzMi0zMiAzMnMtMzItMTQuMzM2LTMyLTMyYzAtODcuNDI0IDcxLjc3Ni0xNTguNTYgMTYwLTE1OC41NnMxNjAgNzIuMDk2IDE2MCAxNjAuNzM2YzAgNDcuOTA0LTM2LjMyIDg0LjE5Mi03MS40MjQgMTE5LjI5NkM1NzIuNzM2IDUzMi45OTIgNTQ0IDU2MS43MjggNTQ0IDU4Ny41NTJsMCA1NC4xMTJDNTQ0IDY1OS4zMjggNTI5LjY2NCA2NzMuNjk2IDUxMiA2NzMuNjk2eiIgcC1pZD0iNTU2OSIgZmlsbD0iI0U5RTlFOSI+PC9wYXRoPjwvc3ZnPg==);
  }
}

@keyframes loading {
  0% {
    transform: rotate3d(0, 0, 1, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
```
