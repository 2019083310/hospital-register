// ?系统管理员操作
const KoaRouter = require('koa-router')
const {
  addSystemMenu
} = require('../controllers/system-controller')

const systemRouter = new KoaRouter({
  prefix: '/system'
})


// *1.添加菜单
systemRouter.post('/menu/add', addSystemMenu)

module.exports = systemRouter