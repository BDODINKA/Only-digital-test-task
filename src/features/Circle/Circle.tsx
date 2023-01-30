import React, { useEffect, useState } from 'react'

import gsap from 'gsap'

import { CategoryType } from '../../app/mockData/types/dataTypes'
import { Button } from '../../common/button/button'
import { rotateWheel } from '../../utils/function/rotateWheel'

import style from './circle.module.scss'

type PropsType = {
  category: CategoryType[]
  onChangeCategory: (index: number) => void
  currentIndex: number
}
export const Circle = (props: PropsType) => {
  const { category, onChangeCategory, currentIndex } = props
  const deg = rotateWheel(category.length, 0)
  const [rotate, setRotate] = useState(deg)
  const [rotateReverse, setRotateReverse] = useState([-120, -180, -240, -300, 0, -60])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const tl = gsap
      .timeline()
      .to('.show', { opacity: 0, display: 'none' })
      .pause(4)
      .to('.show', { opacity: 1, display: 'block', duration: 1 })

    const id = setTimeout(() => {
      tl.removePause(1)
      tl.resume(3)
      setDisabled(false)
    }, 1000)

    return () => clearTimeout(id)
  }, [rotate, currentIndex])

  const onClickHandler = (el: CategoryType, idx: number) => {
    setDisabled(true)
    if (currentIndex !== idx) {
      onChangeCategory(idx)
      gsap.from('.active', { rotate: rotate[idx], duration: 1 })
      const rot1 = rotate.map(el => el - rotate[idx])

      setRotate(rot1)
    }
  }

  return (
    <div className={style.wrapper}>
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
        {<div className={`${style.category} show`}>{Object.keys(category[currentIndex])}</div>}
        {category.map((el, i) => (
          <div className={style.block} style={{ rotate: rotate[i] + 'deg' }} key={i}>
            <div
              className={
                currentIndex === i ? `${style.square} ${style.current}` : `${style.square}`
              }
              onClick={() => onClickHandler(el, i)}
            >
              <div className={`${style.index} active`} style={{ rotate: rotateReverse[i] + 'deg' }}>
                {i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
