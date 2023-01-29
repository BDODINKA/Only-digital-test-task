export const rotateDeg = (elem: number, baseRotate: number) => {
  const arr: number[] = []
  const rotate = 360 / elem

  for (let i = 0; i < elem; i++) {
    if (i === 0) {
      arr.push(baseRotate)
    } else {
      arr.push(arr[i - 1] + rotate)
    }
  }

  return arr
}

export const rotateReverse = (elem: number, val: number) => {
  const arr: number[] = []

  const rotate = 360 / elem

  for (let i = 0; i < elem; i++) {
    if (i === 0) {
      arr.push(val)
    } else {
      arr.push(rotate + (val - arr[i - 1]))
    }
  }
  console.log(arr)

  return arr
}
