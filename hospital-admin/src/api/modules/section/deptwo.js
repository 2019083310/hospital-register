// 二级科室、门诊
import {
  request
} from "@/api"

// 获取所有二级科室/门诊列表
export const getAllDepTwoListFetch = (hosId, depId) => {
  return request.devFetch.request({
    url: '/section/deptwo/list',
    params: {
      hosId,
      depId
    }
  })
}

// 添加二级科室/门诊
export const addDepartmentTwoFetch = (data) => {
  return request.devFetch.request({
    url: '/section/deptwo/add',
    method: 'post',
    data
  })
}

// 删除二级科室/门诊
export const removeDepartmentTwoFetch = (id) => {
  return request.devFetch.request({
    url: `/section/deptwo/remove/${id}`
  })
}

// 修改二级科室/门诊
export const updateDepartmentTwoFetch = (data, id) => {
  return request.devFetch.request({
    url: `/section/deptwo/update/${id}`,
    method: 'put',
    data
  })
}
