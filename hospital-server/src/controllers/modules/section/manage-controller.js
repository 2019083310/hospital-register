// ?系统管理员操作系统设置
const manageModel = require('../../../models/modules/section/manage-model')

class ManageController {
  // *1.获取北京市所有区
  async getAllFieldCont(ctx, next) {
    let result

    try {
      result = await manageModel.getAllFieldService()
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
}

module.exports = new ManageController()