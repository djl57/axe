export function getDirection (offsetX, offsetY) {
  if (offsetX === 0 && offsetY === 0) return 'none'

  if (Math.abs(offsetX) > Math.abs(offsetY)) {
    return offsetX > 0 ? 'right' : 'left'
  } else {
    return offsetY > 0 ? 'down' : 'up'
  }
}
