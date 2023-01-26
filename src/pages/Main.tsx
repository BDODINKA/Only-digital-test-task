import React from 'react'

import { Wrapper } from '../common/wrapper/Wrapper'
import { Circle } from '../features/Circle/Circle'
import { Dates } from '../features/Dates/Dates'
import { Slider } from '../features/Slider/Slider'

import style from './main.module.scss'

export const Main = () => {
  return (
    <main className={style.main}>
      <Wrapper className={style.wrapper}>
        <div className={style.title}>Исторические даты</div>
        <Circle />
        {/*<div className={style.dates}>*/}
        {/*  <Dates currentDate={1992} nextDate={2015} time={100} />*/}
        {/*  <Dates currentDate={2010} nextDate={2022} time={100} />*/}
        {/*</div>*/}
        {/*<Slider />*/}
      </Wrapper>
    </main>
  )
}
