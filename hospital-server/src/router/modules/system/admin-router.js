const KoaRouter = require('koa-router')
const {
  getAllAdminListCont,
  addAdminCont,
  removeAdminCont,
  updateAdminCont
} = require('../../../controllers/modules/system/admin-controller')

const adminRouter = new KoaRouter({
  prefix: '/system'
})


// *1.获取所有管理员列表
adminRouter.get('/admin/list', getAllAdminListCont)

// *2.添加管理员
adminRouter.post('/admin/add', addAdminCont)

// *3.删除管理员
adminRouter.get('/admin/remove/:id', removeAdminCont)

// *4.修改管理员信息
adminRouter.put('/admin/update/:id', updateAdminCont)

module.exports = adminRouter