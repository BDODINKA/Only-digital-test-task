import React from 'react'

import { HistoryDate } from '../features/HistoryDate/HistoryDate'

import style from './main.module.scss'

export const Main = () => {
  return (
    <main className={style.main}>
      <HistoryDate />
      {/*<div style={{ height: '200px' }}></div>*/}
    </main>
  )
}
