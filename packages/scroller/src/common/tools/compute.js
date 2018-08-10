export function getMatrixTranslateY (matrix) {
  let matched = matrix.match(/\((.+)\)/)

  if (matched && matched[1]) {
    let arr = matched[1].split(', ')
    return +(arr[13] || arr[5])
  }

  return 0
}
