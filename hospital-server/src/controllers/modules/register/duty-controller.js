// ?医生排班
const dutyModel = require('../../../models/modules/register/duty-model')

class ManageController {
  // *1.添加医生排班
  async addDoctorDutyCont(ctx, next) {
    let result

    try {
      const {
        hosId,
        depId,
        depTwoId,
        doctorId,
        time,
        mState,
        mTimeSegment,
        mNum,
        mSurplus,
        aState,
        aTimeSegment,
        aNum,
        aSurplus
      } = ctx.request.body

      // 插入数据
      result = await dutyModel.addDoctorDutyService(hosId, depId, depTwoId, doctorId, time, mState, mTimeSegment, mNum, mSurplus, aState, aTimeSegment, aNum, aSurplus)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *2.删除医生排班信息
  async removeDoctorDutyCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params

      // 删除医生排班数据
      result = await dutyModel.removeDoctorDutyService(id)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *3.修改医生排班信息
  async updateDoctorDutyCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params
      const {
        hosId,
        depId,
        depTwoId,
        doctorId,
        time,
        mState,
        mTimeSegment,
        mNum,
        mSurplus,
        aState,
        aTimeSegment,
        aNum,
        aSurplus
      } = ctx.request.body

      // 修改医院数据
      result = await dutyModel.updateDoctorDutyService(hosId, depId, depTwoId, doctorId, time, mState, mTimeSegment, mNum, mSurplus, aState, aTimeSegment, aNum, aSurplus, id)
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

module.exports = new ManageController()