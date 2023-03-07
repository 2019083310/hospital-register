// ?全局提示信息
// todo 在全局注册ElMessage的情况下我们可以这样使用消息提示组件

export const useGlobalTips = (type, message) => {
  return ElMessage({
    type,
    message
  })
}