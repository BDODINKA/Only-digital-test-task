import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Api } from '../../app/mockApi/Api'
import { CategoryType, DataType, ViewItemType } from '../../app/mockData/types/dataTypes'
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
  key: string
  currentCategory: ViewItemType[]
  date: number[]
}

export const getHistoryDateTC = createAsyncThunk<
  DataType,
  undefined,
  { rejectValue: { error: Error } }
>('HISTORY/HISTORY-DATE', async (_, { dispatch, rejectWithValue }): Promise<DataType | any> => {
  dispatch(PreloaderAC({ status: 3 }))
  try {
    const res = await Api.getHistoryData()

    return res
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
    key: '',
    currentCategory: [],
    date: [],
  } as HistoryStateType,
  reducers: {
    PreloaderAC: (state, action: PayloadAction<{ status: LoadType }>) => {
      state.loading = action.payload.status
    },
    setCurrentCategoryAC: (state, action: PayloadAction<{ currentIndex: number }>) => {
      const cat = state.data.category.find((el, i) => i === action.payload.currentIndex)

      if (cat) {
        const key = Object.keys(cat).toString()

        state.currentCategory = state.data.category[action.payload.currentIndex][key]

        const arrDate = state.data.category[action.payload.currentIndex][key].map(el => el.date)

        const sortDate = arrDate.sort((a, b) => a - b)

        if (state.date) {
          state.date = [sortDate[0], sortDate[sortDate.length - 1]]
        } else {
          state.date = [sortDate[0], sortDate[0]]
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getHistoryDateTC.fulfilled, (state, action: PayloadAction<DataType>) => {
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

export const { PreloaderAC, setCurrentCategoryAC } = slice.actions
