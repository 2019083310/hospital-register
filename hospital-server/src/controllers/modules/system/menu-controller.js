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
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *2.请求系统menu
  async getSystemMenu(ctx, next) {
    let result

    try {
      const {
        menuId
      } = ctx.request.query

      result = await systemModel.getSystemMenu(menuId)

    } catch (error) {
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
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
      const err = new Error(error.message)
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
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *5.修改系统菜单
  async updateSystemMenu(ctx, next) {
    let result
    const {
      id,
      name,
      url,
      level,
      key
    } = ctx.request.body

    try {
      result = await systemModel.updateSystemMenu(id, name, url, level, key)
    } catch (error) {
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *6.为二级menu获取父级menu的key
  async getFatherName(ctx, next) {
    let result
    const {
      key
    } = ctx.request.params

    try {
      result = await systemModel.getFatherName(key)
    } catch (error) {
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *7.判断菜单level
  async verifyMenuLevel(ctx, next) {
    let result
    const {
      id
    } = ctx.request.params

    try {
      result = await systemModel.verifyMenuLevel(id)
    } catch (error) {
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *8.筛选一级菜单
  async filterMenuList(ctx, next) {
    const {
      menulist
    } = ctx.request.body
    const newMenuList = []

    try {
      for (const list of menulist) {
        const ret = await systemModel.verifyMenuLevel(list)

        if (ret[0]['level'] !== 1) {
          newMenuList.push(list)
        }
      }
    } catch (error) {
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result: newMenuList
    }
  }
}

module.exports = new SystemController()