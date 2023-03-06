// ?全局提示信息
import {
  ElMessage
} from 'element-plus'

export const useGlobalTips = (type, message) => {
  return ElMessage({
    message,
    type
  })
}