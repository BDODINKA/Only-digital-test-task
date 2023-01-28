import { data } from '../mockData/data'

export const Api = {
  getAppStatus() {
    return new Promise(resolve => {
      resolve(true)
    })
  },
  getHistoryData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data)
      }, 2000)
    })
  },
}
