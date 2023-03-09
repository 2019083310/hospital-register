const KoaRouter = require('koa-router')
const {
  addRoleCont,
  getRoleListCont,
  removeRoleCont,
  updateRoleCont,
  verifyNameUniqueCont
} = require('../../../controllers/modules/system/role-controller')

const roleRouter = new KoaRouter({
  prefix: '/system'
})

// *1.添加角色
roleRouter.post('/role/add', addRoleCont)

// *2.获取角色列表
roleRouter.get('/role/getList', getRoleListCont)

// *3.删除角色
roleRouter.get('/role/remove/:id', removeRoleCont)

// *4.修改角色
roleRouter.put('/role/update/:id', updateRoleCont)

// *5.判断角色名称是否存在
roleRouter.get('/role/unique', verifyNameUniqueCont)

module.exports = roleRouter