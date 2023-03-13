// 登录相关接口
import {
  request
} from "@/api"

// 医生登录
export const doctorLoginFetch = (data) => {
  return request.devFetch.request({
    url: '/login/doctor',
    method: 'post',
    data
  })
}

// 管理员登录
export const adminLoginFetch = (data) => {
  return request.devFetch.request({
    url: '/login/admin',
    method: 'post',
    data
  })
}
