const doctorModel = require('../../../models/modules/section/doctor-model')

class DoctorController {
  // *1.获取所有医生列表
  async getAllDeponeCont(ctx, next) {
    let result

    try {
      const {
        hosId,
        depId,
        depTwoId
      } = ctx.request.query

      result = await doctorModel.getAllDoctorListService(hosId, depId, depTwoId)
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

  // *2.添加医生
  async addDoctorCont(ctx, next) {
    let result

    try {
      const {
        name,
        jobId,
        password,
        hosId,
        depId,
        depTwoId,
        roleId,
        state,
        brief,
        regMoney,
        picture
      } = ctx.request.body

      // 插入数据
      result = await doctorModel.addDoctorService(name, jobId, password, hosId, depId, depTwoId, roleId, state, brief, regMoney, picture)
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
  async removeDoctorCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params

      // 删除医院数据
      result = await doctorModel.removeDoctorService(id)
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
  async updateDoctorCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        name,
        jobId,
        password,
        hosId,
        depId,
        depTwoId,
        roleId,
        state,
        brief,
        regMoney,
        picture,
      } = ctx.request.body
      const {
        id
      } = ctx.request.params

      // 修改医院数据
      result = await doctorModel.updateDoctorService(name, jobId, password, hosId, depId, depTwoId, roleId, state, brief, regMoney, picture, id)
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

module.exports = new DoctorController()