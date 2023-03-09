import {
  request
} from "@/api"

// 添加系统角色
export const addRoleFetch = (name, desc, menu) => {
  return request.devFetch.request({
    url: '/system/role/add',
    method: 'post',
    data: {
      name,
      desc,
      menu
    }
  })
}

// 请求系统角色列表
export const getRoleListFetch = () => {
  return request.devFetch.request({
    url: '/system/role/getList',
  })
}

// 删除角色
export const removeRoleFetch = (id) => {
  return request.devFetch.request({
    url: `/system/role/remove/${id}`
  })
}

// 更改角色
export const updateRoleFetch = (name, desc, menu, id) => {
  return request.devFetch.request({
    url: `/system/role/update/${id}`,
    method: 'put',
    data: {
      name,
      desc,
      menu
    }
  })
}

// 判断角色名称是否唯一
export const verifyUniqueFetch = (name) => {
  return request.devFetch.request({
    url: '/system/role/unique',
    params: {
      name
    }
  })
}
