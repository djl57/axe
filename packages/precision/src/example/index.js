import precision from '@/common'

window.$precision = precision
console.info(precision)

document.getElementById('root').innerHTML = [
  `<h1>Hello, fle-cli.</h1>`
].join('')
