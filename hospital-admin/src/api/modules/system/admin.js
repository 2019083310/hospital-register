// 管理员
import {
  request
} from "@/api"

// 获取所有管理员列表
export const getAllAdminListFetch = () => {
  return request.devFetch.request({
    url: '/system/admin/list'
  })
}

// 添加管理员
export const addAdminFetch = (data) => {
  return request.devFetch.request({
    url: '/system/admin/add',
    method: 'post',
    data
  })
}

// 删除管理员
export const removeAdminFetch = (id) => {
  return request.devFetch.request({
    url: `/system/admin/remove/${id}`
  })
}

// 修改管理员信息
export const updateAdminInfoFetch = (data, id) => {
  return request.devFetch.request({
    url: `/system/admin/update/${id}`,
    method: 'put',
    data
  })
}
