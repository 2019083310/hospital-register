// ?处理app报错
const errorTypes = require('../common/error.types')

const errorHandle = (ctx, type) => {
  let message = ''
  let status = 400

  switch (type) {
    case errorTypes.ACCOUNT_CONFLICT:
      status = 409
      message = '用户名已存在'
      break
    case errorTypes.PASSWORD_ERROR:
      status = 400
      message = '密码错误'
      break
    default:
      status = 400
      message = '未知错误'
      break
  }

  ctx.status = status
  ctx.body = {
    message
  }
}

module.exports = errorHandle