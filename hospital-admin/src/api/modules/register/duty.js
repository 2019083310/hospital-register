// 医生排班
import {
  request
} from "@/api";

// 添加医生排班
export const addDoctorDutyFetch = (data) => {
  return request.devFetch.request({
    url: '/register/duty/add',
    method: 'post',
    data
  })
}

// 删除医生排班
export const removeDoctorDutyFetch = (id) => {
  return request.devFetch.request({
    url: `/register/duty/remove/${id}`
  })
}

// 更改医生排班
export const updateDoctorDutyFetch = (data, id) => {
  return request.devFetch.request({
    url: `/register/duty/remove/${id}`,
    method: 'put',
    data
  })
}
