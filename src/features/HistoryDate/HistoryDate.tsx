import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { AppRootStateType, useAppDispatch } from '../../app/store'
import { Circle } from '../Circle/Circle'
import { Slider } from '../Slider/Slider'

import { getHistoryDateTC, setCurrentCategoryAC } from './historyDate.reducer'

export const HistoryDate = () => {
  const dispatch = useAppDispatch()
  const category = useSelector((state: AppRootStateType) => state.history.data.category)

  const currentCategory = useSelector((state: AppRootStateType) => state.history.currentCategory)

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (!category) {
      debugger
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
    <div>
      <Circle
        category={category}
        onChangeCategory={index => onChangeCategory(index)}
        currentIndex={currentIndex}
      />
      <Slider currentCategory={currentCategory} />
    </div>
  )
}
