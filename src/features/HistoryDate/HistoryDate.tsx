import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { AppRootStateType, useAppDispatch } from '../../app/store'
import { Circle } from '../Circle/Circle'
import { Slider } from '../Slider/Slider'

import { getHistoryDateTC, setCategoryKeyAC, setCurrentCategoryAC } from './historyDate.reducer'

export const HistoryDate = () => {
  const category = useSelector((state: AppRootStateType) => state.history.data.category)

  const key = useSelector((state: AppRootStateType) => state.history.key)

  const currentCategory = useSelector((state: AppRootStateType) => state.history.currentCategory)

  const [currentIndex, setCurrentIndex] = useState(0)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!category) {
      dispatch(getHistoryDateTC())
    } else {
      const keys = JSON.stringify(Object.keys(category[0]).toLocaleString())
      const cat = category[currentIndex][keys]

      dispatch(setCategoryKeyAC({ key: keys }))

      console.log(cat)
    }
  }, [category, currentIndex])

  // useEffect(() => {
  //   if (key) {
  //     const cat = category[0][key]
  //
  //     dispatch(setCurrentCategoryAC({ currentCategory: cat }))
  //   }
  // }, [key])

  console.log(currentCategory)

  const onChangeCategory = (idx: number) => {
    setCurrentIndex(idx)

    const cat = key && category[idx][key]

    cat && dispatch(setCurrentCategoryAC({ currentCategory: cat }))
  }

  console.log(key)
  if (!category) return <div>Render</div>
  console.log(currentCategory)

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
