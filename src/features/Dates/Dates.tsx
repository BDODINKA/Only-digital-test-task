import React, { useEffect, useRef, useState } from 'react'

type PropsType = {
  date: number
} & React.HTMLAttributes<HTMLDivElement>

export const Dates = (props: PropsType) => {
  const { date, className } = props

  const [viewDate, setViewDate] = useState(0)
  const [newDate, setNewDate] = useState(0)
  const [oldDate, setOldDate] = useState(0)

  useEffect(() => {
    setNewDate(date)
  }, [date])

  const changeWithDebounce = (time: number, caseType: 'decr' | 'incr') => {
    setTimeout(() => {
      setOldDate((prev: number) => {
        newDateDebounce(caseType === 'incr' ? prev + 1 : prev - 1, newDate)

        return caseType === 'incr' ? prev + 1 : prev - 1
      })
      setViewDate(prev => (caseType === 'incr' ? prev + 1 : prev - 1))
    }, time)
  }

  const newDateDebounce = (oldDate: number, newDate: number) => {
    if (oldDate !== newDate) {
      switch (oldDate < newDate) {
        case true:
          changeWithDebounce(10, 'incr')
          break
        case false:
          changeWithDebounce(10, 'decr')
          break
        default:
          break
      }
    } else {
      return
    }
  }

  useEffect(() => {
    if (viewDate === 0) {
      setOldDate(newDate)
      setViewDate(newDate)
    } else {
      if (newDate !== oldDate) newDateDebounce(oldDate, newDate)
    }
  }, [newDate])

  // const [dateNext, setDateNext] = useState(nextDate)
  //
  // const intervalRef: { current: NodeJS.Timeout | null } = useRef(null)
  //
  // console.log(currentDate)
  // console.log(nextDate)
  // useEffect(() => {
  //   console.log(currentDate)
  // }, [currentDate])
  //
  // useEffect(() => {
  //   if (date > dateNext) {
  //     intervalRef.current = setInterval(() => {
  //       setDate(date => date - 1)
  //     }, time)
  //   } else {
  //     intervalRef.current = setInterval(() => {
  //       setDate(date => date + 1)
  //     }, time)
  //   }
  //
  //   return () => clearInterval(intervalRef.current as NodeJS.Timeout)
  // }, [currentDate, nextDate])
  //
  // const cancelInterval = () => {
  //   if (date === nextDate) {
  //     clearInterval(intervalRef.current as NodeJS.Timeout)
  //   }
  // }
  //
  // cancelInterval()

  return <div className={className}>{viewDate}</div>
}
