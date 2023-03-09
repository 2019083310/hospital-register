// 医生
import {
  request
} from "@/api"

// 获取所有医生列表
export const getAllDoctorListFetch = (id) => {
  return request.devFetch.request({
    url: '/section/doctor/list',
    params: {
      id
    }
  })
}

// 添加医生
export const addDoctorFetch = (data) => {
  return request.devFetch.request({
    url: '/section/doctor/add',
    method: 'post',
    data
  })
}

// 删除医生
export const removeDoctorFetch = (id) => {
  return request.devFetch.request({
    url: `/section/doctor/remove/${id}`
  })
}

// 修改医生信息
export const updateDoctorInfoFetch = (data, id) => {
  return request.devFetch.request({
    url: `/section/doctor/update/${id}`,
    method: 'put',
    data
  })
}
