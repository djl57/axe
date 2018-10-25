import precision from '@/common'

console.info(precision)

document.getElementById('root').innerHTML = [
  `<h1>精确计算示例</h1>`,

  `<h2>原始计算</h2>`,
  `<p>加法：0.1 + 0.2 = ${0.1 + 0.2}</p>`,
  `<p>减法：0.3 + 0.2 = ${0.3 - 0.2}</p>`,
  `<p>乘法：0.1 * 0.2 = ${0.1 * 0.2}</p>`,
  `<p>除法：0.02 / 0.1 = ${0.02 / 0.1}</p>`,
  `<p>四舍五入：5.15 + 0.003 = ${5.15 + 0.003}</p>`,

  `<h2>精确计算</h2>`,
  `<p>加法：0.1 + 0.2 = ${precision.plus(0.1, 0.2)}</p>`,
  `<p>减法：0.3 + 0.2 = ${precision.minus(0.3, 0.2)}</p>`,
  `<p>乘法：0.1 * 0.2 = ${precision.times(0.1, 0.2)}</p>`,
  `<p>除法：0.02 / 0.1 = ${precision.divide(0.02, 0.1)}</p>`,
  `<p>四舍五入：5.15 + 0.003 = ${precision.round(5.15 + 0.003)}</p>`,

  `<h2>计算工具</h2>`,
  `<p>数字纠正：strip(0.1 + 0.2) = ${precision.strip(0.1 + 0.2)}</p>`,
  `<p>获取小数长度：getDecimalLength(2.000005) = ${precision.getDecimalLength(2.000005)}</p>`,
  `<p>小数转化为整数：float2Int(2.100005) = ${precision.float2Int(2.100005)}</p>`,
  `<p>检测数字是否超过安全数：checkBoundary(Math.pow(10, 100)) = ${precision.checkBoundary(Math.pow(10, 100))}（true表示超过安全数）</p>`
].join('')
