// ?处理app报错
const errorTypes = require('../common/error.types')

const errorHandle = (ctx, error) => {
  let message = ''
  let status = 400

  switch (error) {
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
      message = error.message
      break
  }

  ctx.status = status
  ctx.body = {
    code: -1,
    message
  }
}

module.exports = errorHandle