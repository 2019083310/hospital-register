import {
  request
} from "@/api";

// 请求北京市的所有区
export const getAllFieldFetch = () => {
  return request.devFetch.request({
    url: '/section/manage/field'
  })
}