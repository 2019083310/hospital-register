// ?系统管理员操作系统设置
const systemModel = require('../models/system-model')

class SystemController {
  // *1.增加系统menu
  async addSystemMenu(ctx, next) {
    console.log(ctx.request)
    const {
      name,
      url,
      level,
      key
    } = ctx.request.body

    const res = await systemModel.addSystemMenu(name, url, level, key)
    console.log(res)

    ctx.status = 200
    ctx.body = {
      message: '添加成功'
    }
  }
}

module.exports = new SystemController()