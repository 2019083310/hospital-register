// ?导出路由
const fs = require('fs')
const path = require('path')

// *读取当前目录的所有路由
const appRoutes = async (app) => {
  const routes = fs.readdirSync(path.join(__dirname))

  for (const file of routes) {
    if (file === 'index.js') continue
    const router = require(`./${file}`)

    // koa使用中间件
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = appRoutes