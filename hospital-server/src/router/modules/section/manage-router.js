// ?系统管理员操作
const KoaRouter = require('koa-router')
const {
  getAllFieldCont,
  addHospitalCont,
  getHospitalListCont,
  removeHosCont,
  updateHosCont
} = require('../../../controllers/modules/section/manage-controller')

const manageRouter = new KoaRouter({
  prefix: '/section'
})


// *1.获取北京市所有区
manageRouter.get('/manage/field', getAllFieldCont)

// *2.添加医院
manageRouter.post('/manage/add/hospital', addHospitalCont)

// *3.获取所有医院
manageRouter.get('/manage/hospital/list', getHospitalListCont)

// *4.删除医院
manageRouter.get('/manage/hospital/remove/:id', removeHosCont)

// *5.修改医院信息
manageRouter.put('/manage/hospital/update/:id', updateHosCont)

module.exports = manageRouter