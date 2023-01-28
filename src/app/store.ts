import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { historyDateReducer } from '../features/HistoryDate/historyDate.reducer'

import { appReducer } from './appReducer'

const rootReducer = combineReducers({
  app: appReducer,
  history: historyDateReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatchType>()

// @ts-ignore
window.store = store
