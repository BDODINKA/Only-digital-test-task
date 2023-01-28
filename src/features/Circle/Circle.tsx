import React, { useEffect, useState } from 'react'

import gsap from 'gsap'

import { CategoryType } from '../../app/mockData/types/dataTypes'
import { Button } from '../../common/button/button'
import { rotateDeg } from '../../utils/function/rotateDeg'

import style from './circle.module.scss'

type PropsType = {
  category: CategoryType[]
  onChangeCategory: (index: number) => void
  currentIndex: number
}
export const Circle = (props: PropsType) => {
  const { category, onChangeCategory, currentIndex } = props
  const deg = rotateDeg(category.length, 0)
  const rotateNumbers = rotateDeg(category.length, -120)

  const [rotateCircle, setRotateCircle] = useState(deg)
  const [disabled, setDisabled] = useState(false)
  // const rotateNumbers = [-120, -180, -240, -300, 0, -60]

  useEffect(() => {
    const tl = gsap
      .timeline()
      .to('.show', { opacity: 0, display: 'none' })
      .pause(4)
      .to('.show', { opacity: 1, display: 'block', duration: 1 })

    setTimeout(() => {
      tl.removePause(1)
      tl.resume(3)
      setDisabled(false)
    }, 1000)
  }, [rotateCircle, currentIndex])

  const onClickHandler = (el: CategoryType, idx: number) => {
    setDisabled(true)
    if (currentIndex !== idx) {
      onChangeCategory(idx)
      gsap.from('.active', { rotate: rotateCircle[idx], duration: 1 })

      setRotateCircle(rotateCircle.map(el => el - rotateCircle[idx]))
    }
  }

  return (
    <div className={style.wrapper}>
      {<div className={`${style.category} show`}>{Object.keys(category[currentIndex])}</div>}
      <div className={style.buttonBox}>
        <div className={style.window}>{`0${currentIndex + 1}/0${category.length}`}</div>
        <div className={style.buttons}>
          <Button
            className={style.prevBtn}
            disabled={currentIndex === 0 || disabled}
            onClick={() => onClickHandler(category[currentIndex], currentIndex - 1)}
          />
          <Button
            className={style.nextBtn}
            disabled={currentIndex + 1 === category.length || disabled}
            onClick={() => onClickHandler(category[currentIndex], currentIndex + 1)}
          />
        </div>
      </div>
      <div className={`${style.circle} active`}>
        {category.map((el, i) => (
          <div className={style.block} style={{ rotate: rotateCircle[i] + 'deg' }} key={i}>
            <div className={style.square} onClick={() => onClickHandler(el, i)}>
              <div
                className={`${style.index} active`}
                style={{ rotate: rotateNumbers[currentIndex] + 'deg' }}
              >
                {i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
