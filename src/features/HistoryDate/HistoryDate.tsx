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

  const [datePeriod, setDatePeriod] = useState([1990, 2000])

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

    changeDateHandler()
  }

  const changeDateHandler = () => {
    const arrDate: number[] = []

    currentCategory.forEach(el => arrDate.push(el.date))
    const sortDate = arrDate.sort((a, b) => a - b)

    setDatePeriod([1220, 2020])
    console.log(arrDate, sortDate)
  }

  if (!category) return <div>Render</div>
  console.log(datePeriod)

  return (
    <>
      <div className={style.dates}>
        <Dates date={datePeriod[0]} />
        <Dates date={datePeriod[1]} />
      </div>
      <Circle
        category={category}
        onChangeCategory={index => onChangeCategory(index)}
        currentIndex={currentIndex}
      />
      <Slider currentCategory={currentCategory} />
      <button
        onClick={changeDateHandler}
        style={{ position: 'absolute', width: '200px', height: '100px', zIndex: 10, bottom: '0' }}
      >
        Click
      </button>
    </>
  )
}
