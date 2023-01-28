import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (viewDate === 0) {
      setOldDate(newDate)
      setViewDate(newDate)
    } else {
      if (newDate !== oldDate) newDateDebounce(oldDate, newDate)
    }
  }, [newDate])

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
          changeWithDebounce(100, 'incr')
          break
        case false:
          changeWithDebounce(100, 'decr')
          break
        default:
          break
      }
    } else {
      return
    }
  }

  return <div className={className}>{`${viewDate}`}</div>
}
