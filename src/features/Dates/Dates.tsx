import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

type PropsType = {
  currentDate: number
  time: number
  nextDate: number
} & React.HTMLAttributes<HTMLDivElement>

export const Dates = (props: PropsType) => {
  const { currentDate, nextDate, time, className } = props

  const [date, setDate] = useState(currentDate)

  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null)

  useEffect(() => {
    if (currentDate > nextDate) {
      intervalRef.current = setInterval(() => {
        setDate(sec => sec - 1)
      }, time)
    } else {
      intervalRef.current = setInterval(() => {
        setDate(sec => sec + 1)
      }, time)
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout)
  }, [])

  const cancelInterval = () => {
    if (date === nextDate) {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }
  }

  cancelInterval()

  return (
    <>
      <div className={className}>{date}</div>
    </>
  )
}
