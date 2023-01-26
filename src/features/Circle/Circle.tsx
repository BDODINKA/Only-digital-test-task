import React, { useEffect, useState } from 'react'

import gsap from 'gsap'

import { data } from '../../app/mockData/data'
import { CategoryType } from '../../app/mockData/types/dataTypes'
import { Button } from '../../common/button/button'
import { rotateDeg } from '../../utils/function/rotateDeg'

import style from './circle.module.scss'

export const Circle = () => {
  const deg = rotateDeg(data.category.length, 0)
  const rotateNumbers = rotateDeg(data.category.length, -120)
  const [rotateCircle, setRotateCircle] = useState(deg)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [category, setCategory] = useState(data.category[0])
  const [disabled, setDisabled] = useState(false)
  // const rotateNumbers = [-120, -180, -240, -300, 0, -60]

  const tl = gsap
    .timeline({ paused: true })
    .to('.show', { opacity: 0, display: 'none' })
    .to('.show', { delay: 1, opacity: 1, display: 'block', duration: 0.5 })

  useEffect(() => {
    tl.resume()
    setTimeout(() => {
      setDisabled(false)
    }, 1000)
  }, [rotateCircle])

  const onClickHandler = (el: CategoryType, idx: number) => {
    setDisabled(true)
    if (currentIndex !== idx) {
      gsap.from('.active', { rotate: rotateCircle[idx], duration: 1 })

      setRotateCircle(rotateCircle.map(el => el - rotateCircle[idx]))
      setCurrentIndex(idx)
      setCategory(el)
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.buttonBox}>
        <div className={style.window}>{`0${currentIndex + 1}/0${data.category.length}`}</div>
        <div className={style.buttons}>
          <Button
            className={style.prevBtn}
            disabled={currentIndex === 0 || disabled}
            onClick={() => onClickHandler(category, currentIndex - 1)}
          />
          <Button
            className={style.nextBtn}
            disabled={currentIndex + 1 === data.category.length || disabled}
            onClick={() => onClickHandler(category, currentIndex + 1)}
          />
        </div>
      </div>
      <div className={`${style.circle} active`}>
        {data.category.map((el, i) => (
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
      {<div className={`${style.category} show`}>{Object.keys(category)}</div>}
    </div>
  )
}
