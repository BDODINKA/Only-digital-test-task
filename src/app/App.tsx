import React, { useEffect } from 'react'

import './App.scss'
import { useSelector } from 'react-redux'

import { someError } from '../common/constants/errors'
import { HistoryDate } from '../features/HistoryDate/HistoryDate'
import { Main } from '../pages/Main'

import { InitializeAppTC } from './appReducer'
import { AppRootStateType, useAppDispatch } from './store'

function App() {
  const dispatch = useAppDispatch()
  const initialize = useSelector((state: AppRootStateType) => state.app.isInitialize)

  useEffect(() => {
    dispatch(InitializeAppTC())
  }, [])

  if (!initialize) return <div>{someError}</div>

  return (
    <div className="App">
      <Main />
    </div>
  )
}

export default App
