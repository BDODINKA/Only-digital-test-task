import { someError } from '../../common/constants/errors'
import { data } from '../mockData/data'
import { DataType } from '../mockData/types/dataTypes'

export const Api = {
  getAppStatus() {
    return new Promise(resolve => {
      resolve(true)
    })
  },
  getHistoryData() {
    return ResponseData(data)
  },
}
const ResponseData = (serverData: DataType) => {
  return new Promise((resolve, reject) => {
    if (serverData) {
      setTimeout(() => {
        resolve(serverData)
      }, 1000)
    } else {
      setTimeout(() => {
        reject({ statusCode: 500, data: {}, error: someError })
      }, 1000)
    }
  })
}
