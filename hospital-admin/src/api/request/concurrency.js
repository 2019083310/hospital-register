// *并发请求
import axios from 'axios'

export const concurrency = (arrFetch,keyName) => {
  return axios.all(arrFetch.map((f) => f())).then(axios.spread((...finalResult) => {
    localStorage.setItem(keyName, JSON.stringify(finalResult))
  }))
}
