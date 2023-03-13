// ?验证用户信息中间件
const doctorModel = require('../models/modules/section/doctor-model')
const adminModel = require('../models/modules/system/admin-model')
const errorTypes = require('../common/error.types')

// *1.验证医生信息
const verifyDoctorCont = async (ctx, next) => {
  const {
    jobId,
    password
  } = ctx.request.body

  // 判断工号或者密码是否为空
  if (!jobId || !password) {
    return ctx.app.emit('error', ctx, errorTypes.ACCOUNT_EMPTY)
  }

  // 判断工号是否存在
  let ret
  try {
    ret = await doctorModel.findDoctorInfoByJobId(jobId)
  } catch (error) {
    return ctx.app.emit('error', ctx, error.message)
  }

  if (!ret[0]) {
    return ctx.app.emit('error', ctx, errorTypes.DOCTOR_JOBID_NOT_EXISTS)
  }

  // 判断密码是否正确
  if (password !== ret[0].password) {
    return ctx.app.emit('error', ctx, errorTypes.PASSWORD_ERROR)
  }

  ctx.user = ret[0]
  await next()
}

// *2.验证管理员信息
const verifyAdminCont = async (ctx, next) => {
  const {
    username,
    password
  } = ctx.request.body

  // 判断账号或者密码是否为空
  if (!username || !password) {
    return ctx.app.emit('error', ctx, errorTypes.ACCOUNT_EMPTY)
  }

  // 判断账号是否存在
  let ret
  try {
    ret = await adminModel.findAdminByUserName(username)
  } catch (error) {
    return ctx.app.emit('error', ctx, error.message)
  }

  if (!ret[0]) {
    return ctx.app.emit('error', ctx, errorTypes.ACCOUNT_EMPTY)
  }

  // 判断密码是否正确
  if (password !== ret[0].password) {
    return ctx.app.emit('error', ctx, errorTypes.PASSWORD_ERROR)
  }

  ctx.user = ret[0]
  // ?注意：这里中间件的Next函数必须是await ,Koa里面的洋葱模型，我们ctx.body的内容并不会立即返回
  // ?而是遵循洋葱模型的概念，显示一层一层往里走，执行完之后，一层一层往外走，走完之后，才会返回结果
  await next()
}

module.exports = {
  verifyDoctorCont,
  verifyAdminCont
}