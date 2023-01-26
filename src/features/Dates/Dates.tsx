import React, { useEffect, useState } from 'react'

type PropsType = {
  currentDate: number
  time: number
  nextDate: number
} & React.HTMLAttributes<HTMLDivElement>

export const Dates = (props: PropsType) => {
  const { currentDate, nextDate, time, className } = props

  const [currVal, setCurrVal] = useState(currentDate)

  useEffect(() => {
    if (currentDate < nextDate) {
      currVal !== nextDate && setTimeout(setCurrVal, time, currVal + 1)
    } else {
      currVal !== nextDate && setTimeout(setCurrVal, time, currVal - 1)
    }
    if (currVal === nextDate) {
      // alert('dddd')
    }
  }, [currVal])

  return <div className={className}>{currVal}</div>
}
