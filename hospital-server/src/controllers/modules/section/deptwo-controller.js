const depTwoModel = require('../../../models/modules/section/deptwo-model')

class DepTwoController {
  // *1.获取所有二级科室、门诊
  async getAllDepTwoListCont(ctx, next) {
    let result

    try {
      const {
        id
      } = ctx.request.query

      result = await depTwoModel.getAllDepTwoListService(id)
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

  // *2.添加二级科室/门诊
  async addDepartmentTwoCont(ctx, next) {
    let result

    try {
      const {
        name,
        state,
        hosId,
        depId,
        address,
      } = ctx.request.body

      // 插入数据
      result = await depTwoModel.addDepTwoService(name, state, hosId, depId, address)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *3.删除二级科室/门诊
  async removeDepTwoCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params

      // 删除医院数据
      result = await depTwoModel.removeDepTwoService(id)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *4.修改二级科室/门诊信息
  async updateDepTwoInfoCont(ctx, next) {
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
        depId,
        address
      } = ctx.request.body

      // 修改医院数据
      result = await depTwoModel.updateDepTwoInfoService(name, state, hosId, depId, address, id)
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

module.exports = new DepTwoController()