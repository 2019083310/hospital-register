const KoaRouter = require('koa-router')
const {
  addDoctorDutyCont,
  removeDoctorDutyCont,
  updateDoctorDutyCont
} = require('../../../controllers/modules/register/duty-controller')

const dutyRouter = new KoaRouter({
  prefix: '/register'
})


// *1.获取所有医生排班列表
// dutyRouter.get('/duty/list', getAllDeponeCont)

// *2.添加医生排班
dutyRouter.post('/duty/add', addDoctorDutyCont)

// *3.删除医生排班
dutyRouter.get('/duty/remove/:id', removeDoctorDutyCont)

// *4.修改医生排班信息
dutyRouter.put('/duty/update/:id', updateDoctorDutyCont)

module.exports = dutyRouter