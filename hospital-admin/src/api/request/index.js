import axios from 'axios'

import {
  DEV_BASEURL,
  PRO_BASEURL,
  TIMEOUT
} from './config'

class LyFetch {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use((config) => {
      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      return res
    }, err => {
      return err
    })
  }

  request(config) {
    return this.instance.request(config)
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
}

export const devFetch = new LyFetch(DEV_BASEURL, TIMEOUT)
export const proFetch = new LyFetch(PRO_BASEURL, TIMEOUT)