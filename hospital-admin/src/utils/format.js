import dayjs from "dayjs";

// 格式化时间格式为 YYYY-MM-DD HH:mm:ss
export const formatDate = (timestamp) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}