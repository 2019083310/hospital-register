const {
  generateToken
} = require('../../../middleware/verify-middleware')
const loginModel = require('../../../models/modules/login/login-model')
const roleModel = require('../../../models/modules/system/role-model')

class LoginCont {
  // *1.医生登录
  async doctorLoginCont(ctx, next) {
    const {
      jobId,
      roleId
    } = ctx.user
    let token
    let menuList

    try {
      token = generateToken({
        jobId
      })

      menuList = await roleModel.getRoleListService(roleId)
    } catch (error) {
      return ctx.app.emit('error', ctx, error.message)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      data: {
        token,
        menu: menuList[0].menu,
        message: "登录成功"
      }
    }
  }

  // *2管理员登录
  async adminLoginCont(ctx, next) {
    const {
      username,
      id,
      roleId
    } = ctx.user
    let token
    let menuList

    try {
      token = generateToken({
        username,
        id
      })

      menuList = await roleModel.getRoleListService(roleId)

    } catch (error) {
      return ctx.app.emit('error', ctx, error.message)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      data: {
        token,
        menu: menuList[0].menu,
        message: "登录成功"
      }
    }
  }
}

module.exports = new LoginCont()