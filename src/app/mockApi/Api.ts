import { data } from '../mockData/data'

export const Api = {
  getAppStatus() {
    return data
  },
  getHistoryData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data)
      }, 2000)
    })
  },
}
