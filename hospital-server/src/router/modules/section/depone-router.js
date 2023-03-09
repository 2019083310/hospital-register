const KoaRouter = require('koa-router')
const {
  getAllDeponeCont,
  addDepartmentCont,
  removeDeponeCont,
  updateDeponeCont
} = require('../../../controllers/modules/section/depone-controller')

const deponeRouter = new KoaRouter({
  prefix: '/section'
})


// *1.获取所有科室
deponeRouter.get('/depone/list', getAllDeponeCont)

// *2.添加科室
deponeRouter.post('/depone/add', addDepartmentCont)

// *3.删除科室
deponeRouter.get('/depone/remove/:id', removeDeponeCont)

// *4.修改科室信息
deponeRouter.put('/depone/update/:id', updateDeponeCont)

module.exports = deponeRouter