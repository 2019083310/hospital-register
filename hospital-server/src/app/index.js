// ?集成中间件入口
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const KoaBody = require('koa-body')
const appRoutes = require('../router/index')

const errorHandle = require('./errorhandle')
const app = new Koa()

// *处理跨域
app.use(cors())

// *通过ctx.request.body处理post/put请求
// app.use(bodyParser({
//   enableTypes: ['json', 'form', 'text']
// }))

// *处理大文件上传form-data格式
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 1024 * 1024 * 200
  }
}))

// *所有的路由集成
appRoutes(app)

// *监听错误
app.on('error', errorHandle)

module.exports = app