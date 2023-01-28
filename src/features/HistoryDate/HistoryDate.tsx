import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { AppRootStateType, useAppDispatch } from '../../app/store'
import style from '../../pages/main.module.scss'
import { Circle } from '../Circle/Circle'
import { Dates } from '../Dates/Dates'
import { Slider } from '../Slider/Slider'

import { getHistoryDateTC, setCurrentCategoryAC } from './historyDate.reducer'

export const HistoryDate = () => {
  const dispatch = useAppDispatch()
  const category = useSelector((state: AppRootStateType) => state.history.data.category)

  const currentCategory = useSelector((state: AppRootStateType) => state.history.currentCategory)

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const [datePeriod, setDatePeriod] = useState<{ curr: number; next: number }>({
    curr: 1820,
    next: 1720,
  })

  useEffect(() => {
    if (!category) {
      dispatch(getHistoryDateTC())
    }
    if (category) {
      dispatch(setCurrentCategoryAC({ currentIndex }))
    }
  }, [category])

  const onChangeCategory = (idx: number) => {
    setCurrentIndex(idx)

    dispatch(setCurrentCategoryAC({ currentIndex }))
  }

  if (!category) return <div>Render</div>

  return (
    <>
      <div className={style.dates}>
        <Dates currentDate={datePeriod.curr} nextDate={datePeriod.next} time={100} />
      </div>
      <Circle
        category={category}
        onChangeCategory={index => onChangeCategory(index)}
        currentIndex={currentIndex}
      />
      <Slider currentCategory={currentCategory} />
    </>
  )
}
