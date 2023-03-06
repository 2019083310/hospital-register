// ?系统管理员操作系统设置
const systemModel = require('../../../models/modules/system/menu-model')

class SystemController {
  // *1.增加系统menu
  async addSystemMenu(ctx, next) {
    const {
      name,
      url,
      level,
      key
    } = ctx.request.body
    let result

    try {
      result = await systemModel.addSystemMenu(name, url, level, key)
    } catch (error) {
      const err = new Error(error)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      result
    }
  }

  // *2.请求系统menu
  async getSystemMenu(ctx, next) {
    let result

    try {
      result = await systemModel.getSystemMenu()

    } catch (error) {
      const err = new Error(error)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      result
    }
  }

  // *3.删除系统menu
  async removeSystemMenu(ctx, next) {
    let result
    const {
      id
    } = ctx.request.params

    try {
      result = await systemModel.removeSystemMenu(id)
    } catch (error) {
      const err = new Error(error)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *4.删除系统一级menu
  async removeSystemFirstMenu(ctx, next) {
    let result
    const {
      key
    } = ctx.request.params

    try {
      result = await systemModel.removeSystemFirstMenu(key)
    } catch (error) {
      const err = new Error(error)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }
}

module.exports = new SystemController()