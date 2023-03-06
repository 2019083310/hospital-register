// ?系统管理员操作
const KoaRouter = require('koa-router')
const {
  addSystemMenu,
  getSystemMenu,
  removeSystemMenu,
  removeSystemFirstMenu
} = require('../../../controllers/modules/system/menu-controller')

const systemRouter = new KoaRouter({
  prefix: '/system'
})


// *1.添加菜单
systemRouter.post('/menu/add', addSystemMenu)

// *2.查找菜单列表
systemRouter.get('/menu/list', getSystemMenu)

// *3.删除某一项菜单
systemRouter.get('/menu/remove/:id', removeSystemMenu)

// *4.删除一级level
systemRouter.get('/menu/remove/one/:key', removeSystemFirstMenu)

module.exports = systemRouter