// ?系统管理员模块api
import {
  request
} from "../..";

// 增加菜单项
export const addMenuItem = (data) => {
  return request.devFetch.request({
    url: '/system/menu/add',
    method: 'post',
    data
  })
}

// 获取菜单列表
export const getMenuList = () => {
  return request.devFetch.request({
    url: '/system/menu/list',
  })
}

// 删除菜单项
export const removeMenuItem = (id) => {
  return request.devFetch.request({
    url: `/system/menu/remove/${id}`
  })
}

// 删除一级菜单项
export const removeMenuFistItem = (key) => {
  return request.devFetch.request({
    url: `/system/menu/remove/one/${key}`
  })
}