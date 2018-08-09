export function momentum (current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
  // console.log(arguments)

  // momentum(this.y, this.startY, duration, this.maxScrollY, this.minScrollY, wrapperHeight, this.options)
  let distance = current - start
  let speed = Math.abs(distance) / time
  // console.log(distance, time)

  let {deceleration, itemHeight, swipeBounceTime, wheel, swipeTime} = options
  // deceleration = 0.001
  let duration = swipeTime // 2500ms
  let rate = wheel ? 4 : 15 // 15

  let destination = current + speed / deceleration * (distance < 0 ? -1 : 1)

  if (wheel && itemHeight) {
    destination = Math.round(destination / itemHeight) * itemHeight
  }

  if (destination < lowerMargin) {
    destination = wrapperSize ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - (wrapperSize / rate * speed)) : lowerMargin
    duration = swipeBounceTime
  } else if (destination > upperMargin) {
    destination = wrapperSize ? Math.min(upperMargin + wrapperSize / 4, upperMargin + wrapperSize / rate * speed) : upperMargin
    // console.log(wrapperSize, upperMargin + wrapperSize / 4, upperMargin + wrapperSize / rate * speed)

    duration = swipeBounceTime
  }

  return {
    destination: Math.round(destination),
    duration
  }
}
