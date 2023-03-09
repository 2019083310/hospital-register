const KoaRouter = require('koa-router')
const {
  getAllDepTwoListCont,
  addDepartmentTwoCont,
  removeDepTwoCont,
  updateDepTwoInfoCont
} = require('../../../controllers/modules/section/deptwo-controller')

const depTwoRouter = new KoaRouter({
  prefix: '/section'
})


// *1.获取所有科室
depTwoRouter.get('/deptwo/list', getAllDepTwoListCont)

// *2.添加科室
depTwoRouter.post('/deptwo/add', addDepartmentTwoCont)

// *3.删除科室
depTwoRouter.get('/deptwo/remove/:id', removeDepTwoCont)

// *4.修改科室信息
depTwoRouter.put('/deptwo/update/:id', updateDepTwoInfoCont)

module.exports = depTwoRouter