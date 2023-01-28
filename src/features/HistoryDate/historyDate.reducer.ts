import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Api } from '../../app/mockApi/Api'
import { DataType, ViewItemType } from '../../app/mockData/types/dataTypes'
import { someError } from '../../common/constants/errors'

export enum LoadType {
  'idle' = 0,
  'succeed' = 1,
  'failed' = 2,
  'loading' = 3,
}

type Error = null | string

export type HistoryStateType = {
  loading: LoadType
  ErrorMessage: Error
  data: DataType
  key: string | null
  currentCategory: ViewItemType[]
}

export const getHistoryDateTC = createAsyncThunk<
  DataType,
  undefined,
  { rejectValue: { error: Error } }
>('HISTORY/HISTORY-DATE', async (_, { dispatch, rejectWithValue }): Promise<DataType | any> => {
  dispatch(PreloaderAC({ status: 3 }))
  try {
    const res = await Api.getHistoryData()

    return res as DataType
  } catch (reason) {
    rejectWithValue(reason as { error: Error })
  } finally {
    dispatch(PreloaderAC({ status: 0 }))
  }
})

const slice = createSlice({
  name: 'HISTORY',
  initialState: {
    loading: 0,
    ErrorMessage: null,
    data: {} as DataType,
    key: null,
    currentCategory: [],
  } as HistoryStateType,
  reducers: {
    PreloaderAC: (state, action: PayloadAction<{ status: LoadType }>) => {
      state.loading = action.payload.status
    },
    setCategoryKeyAC: (state, action: PayloadAction<{ key: string }>) => {
      state.key = action.payload.key
    },
    setCurrentCategoryAC: (state, action: PayloadAction<{ currentCategory: ViewItemType[] }>) => {
      state.currentCategory = action.payload.currentCategory
    },
  },
  extraReducers: builder => {
    builder.addCase(getHistoryDateTC.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(getHistoryDateTC.rejected, (state, action) => {
      if (action.payload) {
        state.ErrorMessage = action.payload.error
      } else {
        state.ErrorMessage = someError
      }
    })
  },
})

export const historyDateReducer = slice.reducer

export const { PreloaderAC, setCurrentCategoryAC, setCategoryKeyAC } = slice.actions
