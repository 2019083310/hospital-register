const KoaRouter = require('koa-router')
const {
  doctorLoginCont,
  adminLoginCont
} = require('../../../controllers/modules/login/login-controller')
const {
  verifyDoctorCont,
  verifyAdminCont
} = require('../../../middleware/verify-user')

const loginRouter = new KoaRouter({
  prefix: '/login'
})

// *1.医生登录
loginRouter.post('/doctor', verifyDoctorCont, doctorLoginCont)

// *2.管理员登录
loginRouter.post('/admin', verifyAdminCont, adminLoginCont)

module.exports = loginRouter