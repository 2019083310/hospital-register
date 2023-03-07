// ?系统管理员操作
const KoaRouter = require('koa-router')
const {
  getAllFieldCont
} = require('../../../controllers/modules/section/manage-controller')

const manageRouter = new KoaRouter({
  prefix: '/section'
})


// *1.获取北京市所有区
manageRouter.get('/manage/field',getAllFieldCont)


module.exports = manageRouter