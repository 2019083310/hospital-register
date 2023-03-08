import {
  request
} from "@/api";

// 请求北京市的所有区
export const getAllFieldFetch = () => {
  return request.devFetch.request({
    url: '/section/manage/field'
  })
}

// 添加医院
export const addHospitalFetch = (data) => {
  return request.devFetch.request({
    url: '/section/manage/add/hospital',
    method: 'post',
    data
  })
}

// 删除某张医院图片
export const removeHosLogoFetch = (id) => {
  return request.devFetch.request({
    url: `/file/picture/remove/${id}`
  })
}

// 获取医院列表
export const getHospitalListFetch = () => {
  return request.devFetch.request({
    url: '/section/manage/hospital/list'
  })
}

// 删除医院
export const removeHospitalFetch = (id) => {
  return request.devFetch.request({
    url: `/section/manage/hospital/remove/${id}`
  })
}

// 修改医院信息
export const updateHospitalInfoFetch = (data, id) => {
  return request.devFetch.request({
    url: `/section/manage/hospital/update/${id}`,
    method: 'put',
    data
  })
}