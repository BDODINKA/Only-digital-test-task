import React, { useState } from 'react'

import gsap from 'gsap'

import { data } from '../../app/mockData/data'
import { CategoryType } from '../../app/mockData/types/dataTypes'
import { rotateDeg } from '../../utils/function/rotateDeg'

import style from './circle.module.scss'

export const Circle = () => {
  const deg = rotateDeg(data.category.length, 0)
  const [rotateCircle, setRotateCircle] = useState(deg)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [category, setCategory] = useState(Object.keys(data.category[0]))

  const onClickHandler = (el: CategoryType, idx: number) => {
    if (currentIndex !== idx) {
      setRotateCircle(rotateCircle.map(el => el - rotateCircle[idx]))

      setCurrentIndex(idx)
      gsap.from('.active', { rotate: rotateCircle[idx], duration: 1 })
    }
    setCategory(Object.keys(el))
  }

  return (
    <>
      {category && <div className={style.category}>{category.toString()}</div>}
      <div className={`${style.circle} active`}>
        {data.category.map((el, i) => (
          <div className={style.block} style={{ rotate: rotateCircle[i] + 'deg' }} key={i}>
            <div className={style.square} onClick={() => onClickHandler(el, i)}>
              {i}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
