const connection = require('../../../app/database')

class DutyModel {
  // *1.添加医生排班
  async addDoctorDutyService(hosId, depId, depTwoId, doctorId, time, mState, mTimeSegment, mNum, mSurplus, aState, aTimeSegment, aNum, aSurplus) {
    const statement = 'INSERT INTO duty (`hosId`,`depId`,`depTwoId`,`doctorId`,`time`,`mState`,`mTimeSegment`,`mNum`,`mSurplus`,`aState`,`aTimeSegment`,`aNum`,`aSurplus`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);'

    const result = await connection.execute(statement, [hosId, depId, depTwoId, doctorId, time, mState, mTimeSegment, mNum, mSurplus, aState, aTimeSegment, aNum, aSurplus])
    return result[0]
  }

  // *2.删除医生排班
  async removeDoctorDutyService(id) {
    const statement = 'DELETE FROM duty WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }

  // *3.修改医生排班信息
  async updateDoctorDutyService(hosId, depId, depTwoId, doctorId, time, mState, mTimeSegment, mNum, mSurplus, aState, aTimeSegment, aSurplus, id) {
    const statement = 'UPDATE duty SET `hosId`=?,`depId`=?,`depTwoId`=?,`doctorId`=?,`time`,`mState`=?,`mTimeSegment`=?,`mNum`=?,`mSurplus`=?,`aState`=?,`aTimeSegment`=?,`aNum`=?,`aSurplus`=? WHERE `id`=?;'

    const result = await connection.execute(statement, [hosId, depId, depTwoId, doctorId, time, mState, mTimeSegment, mNum, mSurplus, aState, aTimeSegment, aSurplus, id])
    return result[0]
  }
}

module.exports = new DutyModel()