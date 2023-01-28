import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { someError } from '../common/constants/errors'
import { getHistoryDateTC } from '../features/HistoryDate/historyDate.reducer'

import { Api } from './mockApi/Api'

export enum LoadType {
  'idle' = 0,
  'succeed' = 1,
  'failed' = 2,
  'loading' = 3,
}

type Error = null | string

export type LoadStateType = {
  loading: LoadType
  ErrorMessage: Error
  isInitialize: boolean
}

export const InitializeAppTC = createAsyncThunk<{}, undefined, { rejectValue: { error: Error } }>(
  'APP/INITIALIZE-APP',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(PreloaderAC({ status: 3 }))
    try {
      await Api.getAppStatus()
    } catch (reason) {
      return rejectWithValue(reason as { error: Error })
    } finally {
      dispatch(PreloaderAC({ status: 0 }))
    }
  }
)

const slice = createSlice({
  name: 'APP',
  initialState: {
    loading: 0,
    ErrorMessage: null,
    isInitialize: false,
  } as LoadStateType,
  reducers: {
    PreloaderAC: (state, action: PayloadAction<{ status: LoadType }>) => {
      state.loading = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(InitializeAppTC.fulfilled, state => {
      state.isInitialize = true
    })
    builder.addCase(InitializeAppTC.rejected, (state, action) => {
      state.isInitialize = true
      if (action.payload) {
        state.ErrorMessage = action.payload.error
      } else {
        state.ErrorMessage = someError
      }
    })
  },
})

export const appReducer = slice.reducer

export const { PreloaderAC } = slice.actions
