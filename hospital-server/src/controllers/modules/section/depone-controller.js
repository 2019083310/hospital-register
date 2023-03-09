const deponeModel = require('../../../models/modules/section/depone-model')

class DepOneController {
  // *1.获取所有科室
  async getAllDeponeCont(ctx, next) {
    let result

    try {
      const {
        id
      } = ctx.request.query

      result = await deponeModel.getAllDeponeService(id)
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

  // *2.添加科室
  async addDepartmentCont(ctx, next) {
    let result

    try {
      const {
        name,
        state,
        hosId,
      } = ctx.request.body

      // 插入数据
      result = await deponeModel.addDeponeService(name, state, hosId)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *3.删除科室
  async removeDeponeCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params

      // 删除医院数据
      result = await deponeModel.removeDeponeService(id)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *4.修改科室信息
  async updateDeponeCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params
      const {
        name,
        state,
        hosId,
      } = ctx.request.body

      // 修改医院数据
      result = await deponeModel.updateDeponeService(name, state, hosId, id)
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

module.exports = new DepOneController()