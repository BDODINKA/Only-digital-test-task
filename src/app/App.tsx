import React, { useEffect } from 'react'

import './App.scss'
import { useSelector } from 'react-redux'

import { someError } from '../common/constants/errors'
import { HistoryDate } from '../features/HistoryDate/HistoryDate'

import { InitializeAppTC } from './appReducer'
import { AppRootStateType, useAppDispatch } from './store'

function App() {
  const dispatch = useAppDispatch()
  const initialize = useSelector((state: AppRootStateType) => state.app.isInitialize)

  useEffect(() => {
    dispatch(InitializeAppTC())
  }, [])
  if (!initialize) return <div>{someError}</div>
  ;[{ value: 1, Ox: '', Oy: '', isHovered: false }]

  return (
    <div className="App">
      {/*<Main />*/}
      <HistoryDate />
      {/*<div className={'s'}>*/}
      {/*  {[*/}
      {/*    { x: 241 + 270 * Math.sin(-90), y: 270 + 270 * Math.sin(0) },*/}
      {/*    { x: 270 + 270 * Math.sin(-120), y: 270 + 270 * Math.sin(-90) },*/}
      {/*    { x: 270 + 270 * Math.sin(0), y: 270 + 270 * Math.sin(90) },*/}

      {/*    // { x: 270 + 270 * Math.cos(90), y: 270 + 270 * Math.sin(90) },*/}
      {/*    // { x: 270 + 270 * Math.cos(90), y: 270 + 270 * Math.sin(90) },*/}
      {/*  ].map((el, i) => (*/}
      {/*    <div*/}
      {/*      key={i}*/}
      {/*      style={{*/}
      {/*        position: 'absolute',*/}
      {/*        top: `${el.x}px`,*/}
      {/*        right: `${el.y}px`,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {i}*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  )
}

export default App
