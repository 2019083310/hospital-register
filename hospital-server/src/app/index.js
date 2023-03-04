// ?集成中间件入口
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const appRoutes = require('../router/index')

const errorHandle = require('./errorhandle')
const app = new Koa()

// *处理跨域
app.use(cors())

// *通过ctx.request.body处理post/put请求
app.use(bodyParser())

// *所有的路由集成
appRoutes(app)

// *监听错误
app.on('error', errorHandle)

module.exports = app