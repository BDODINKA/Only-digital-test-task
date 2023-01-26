export const rotateDeg = (elem: number, baseRotate: number) => {
  const arr: number[] = []
  const rotate = 360 / elem

  for (let i = 0; i < elem; i++) {
    if (i === 0) {
      arr.push(baseRotate)
    } else if (Math.sign(baseRotate) < 0) {
      if (i === 0) {
        arr.push(baseRotate)
      } else {
        arr.push(arr[i - 1] + -rotate)
      }
    } else {
      arr.push(arr[i - 1] + rotate)
    }
  }

  return arr
}
