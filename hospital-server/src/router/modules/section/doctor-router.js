const KoaRouter = require('koa-router')
const {
  getAllDeponeCont,
  addDoctorCont,
  removeDoctorCont,
  updateDoctorCont
} = require('../../../controllers/modules/section/doctor-controller')

const doctorRouter = new KoaRouter({
  prefix: '/section'
})


// *1.获取所有医生列表
doctorRouter.get('/doctor/list', getAllDeponeCont)

// *2.添加医生
doctorRouter.post('/doctor/add', addDoctorCont)

// *3.删除医生
doctorRouter.get('/doctor/remove/:id', removeDoctorCont)

// *4.修改医生信息
doctorRouter.put('/doctor/update/:id', updateDoctorCont)

module.exports = doctorRouter