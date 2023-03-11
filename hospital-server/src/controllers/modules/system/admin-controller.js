const adminModel = require('../../../models/modules/system/admin-model')

class AdminController {
  // *1.获取所有管理员列表
  async getAllAdminListCont(ctx, next) {
    let result

    try {
      result = await adminModel.getAllAdminListService()
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

  // *2.添加管理员
  async addAdminCont(ctx, next) {
    let result

    try {
      const {
        username,
        password,
        roleId,
        state,
        picture
      } = ctx.request.body

      // 插入数据
      result = await adminModel.addAdminService(username, password, roleId, state, picture)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *3.删除管理员
  async removeAdminCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params

      // 删除管理员数据
      result = await adminModel.removeAdminService(id)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *4.修改管理员信息
  async updateAdminCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        username,
        password,
        roleId,
        state,
        picture,
      } = ctx.request.body
      const {
        id
      } = ctx.request.params

      // 修改管理员数据
      result = await adminModel.updateAdminService(username, password, roleId, state, picture, id)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }
}

module.exports = new AdminController()