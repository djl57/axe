// 复制
export default function copy (text) {
  let el = document.createElement('input')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  el.remove()
}