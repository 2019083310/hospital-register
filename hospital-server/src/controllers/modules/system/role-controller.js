const roleModel = require('../../../models/modules/system/role-model')
const errorTypes = require('../../../common/error.types')

class RoleController {
  // *1.添加角色
  async addRoleCont(ctx, next) {
    let result
    const {
      name,
      desc,
      menu
    } = ctx.request.body

    try {
      result = await roleModel.addRoleService(name, desc, menu)
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

  // *2.获取角色列表
  async getRoleListCont(ctx, next) {
    let result

    try {
      result = await roleModel.getRoleListService()
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

  // *3.删除角色
  async removeRoleCont(ctx, next) {
    let result
    const {
      id
    } = ctx.request.params

    try {
      result = await roleModel.removeRoleService(id)
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

  // *4.更改角色
  async updateRoleCont(ctx, next) {
    let result
    const {
      name,
      desc,
      menu
    } = ctx.request.body

    try {
      // 判断名字是否已经存在
      const ret = await roleModel.getRoleNameService(name.trim())
      if (ret.length) {
        result = await roleModel.updateRoleService('', desc, menu)
      } else {
        result = await roleModel.updateRoleService(name, desc, menu)
      }
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

  // *5.判断角色名称是否已经存在
  async verifyNameUniqueCont(ctx, next) {
    let ret = false

    const {
      name
    } = ctx.request.query

    try {
      // 判断名字是否已经存在
      const result = await roleModel.getRoleNameService(name.trim())
      if (result.length) {
        ret = true
      }
    } catch (error) {
      return ctx.app.emit('error', ctx, error.message)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      ret
    }
  }
}

module.exports = new RoleController