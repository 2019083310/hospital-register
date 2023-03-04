import axios from 'axios'

import {
  TIME_OUT,
  DEV_BASE_URL
} from './config'

class LyRequest {
  constructor(timeout, baseurl) {
    this.instance = axios.create({
      timeout,
      baseURL: baseurl
    })

    this.instance.interceptors.request.use((config) => {
      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use((res) => {
      return res
    }, err => {
      return err
    })
  }

  get(config) {
    return this.request({
      ...config,
      method: 'get'
    })
  }

  post(config) {
    return this.request({
      ...config,
      method: 'post'
    })
  }

  request(config) {
    return this.instance.request(config)
  }
}

export default new LyRequest(TIME_OUT, DEV_BASE_URL)