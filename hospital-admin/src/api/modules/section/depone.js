// 一级科室
import {
  request
} from "@/api"

// 获取所有一级科室列表
export const getAllDepOneListFetch = (id) => {
  return request.devFetch.request({
    url: '/section/depone/list',
    params: {
      id
    }
  })
}

// 添加一级科室
export const addDepartmentFetch = (data) => {
  return request.devFetch.request({
    url: '/section/depone/add',
    method: 'post',
    data
  })
}

// 删除一级科室
export const removeDepartmentFetch = (id) => {
  return request.devFetch.request({
    url: `/section/depone/remove/${id}`
  })
}

// 删除一级科室
export const updateDepartmentFetch = (data, id) => {
  return request.devFetch.request({
    url: `/section/depone/update/${id}`,
    method: 'put',
    data
  })
}
