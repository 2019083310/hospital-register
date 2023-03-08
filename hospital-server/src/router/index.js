// ?导出路由
const fs = require('fs')
const path = require('path')
const fileRouter = require('./file-router')

// *读取当前目录的所有路由
const appRoutes = async (app) => {
  const routesDir = fs.readdirSync(path.join(__dirname, './modules'))

  for (const dir of routesDir) {
    const routerFile = fs.readdirSync(path.join(__dirname, `./modules/${dir}`))

    for (const file of routerFile) {
      const router = require(path.join(__dirname, `./modules/${dir}/${file}`))

      // koa使用中间件
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  }

  app.use(fileRouter.routes())
  app.use(fileRouter.allowedMethods())
}

module.exports = appRoutes