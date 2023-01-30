import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { AppRootStateType } from '../../app/store'
import { Wrapper } from '../../common/wrapper/Wrapper'
import style from '../../pages/main.module.scss'
import { useAppDispatch } from '../../utils/hooks/useDispatch'
import { Circle } from '../Circle/Circle'
import { Dates } from '../Dates/Dates'
import { Slider } from '../Slider/Slider'

import { getHistoryDateTC, setCurrentCategoryAC } from './historyDate.reducer'

export const HistoryDate = () => {
  const dispatch = useAppDispatch()
  const category = useSelector((state: AppRootStateType) => state.history.data.category)

  const currentCategory = useSelector((state: AppRootStateType) => state.history.currentCategory)

  const date = useSelector((state: AppRootStateType) => state.history.date)

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (!category) {
      dispatch(getHistoryDateTC())
    } else {
      dispatch(setCurrentCategoryAC({ currentIndex }))
    }
  }, [category])

  const onChangeCategory = (idx: number) => {
    setCurrentIndex(idx)
    dispatch(setCurrentCategoryAC({ currentIndex: idx }))
  }

  if (!category) return <div>Render</div>

  return (
    <>
      <Wrapper className={style.wrapper}>
        <div className={style.box}>
          <div className={style.title}>Исторические даты</div>
          {date && (
            <div className={style.dates}>
              <Dates date={date[0]} />
              <Dates date={date[1]} />
            </div>
          )}
          <Circle
            category={category}
            onChangeCategory={index => onChangeCategory(index)}
            currentIndex={currentIndex}
          />
          <Slider currentCategory={currentCategory} />
        </div>
      </Wrapper>
    </>
  )
}
