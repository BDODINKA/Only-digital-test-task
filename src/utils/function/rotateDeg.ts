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

export const rotateNumbers = (elem: number[], val: number[]) => {
  const arr: number[] = []
  const rotate = 360 / elem.length

  for (let i = 0; i < elem.length; i++) {
    if (i === 0) {
      arr.push(Math.abs(rotate + val[i]))
    } else {
      arr.push(rotate - (elem[i] + Math.abs(val[0])))
    }
  }

  return arr
}
