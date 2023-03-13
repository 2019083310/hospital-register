const connection = require('../../../app/database')

class DoctorModel {
  // *1.获取所有医生列表
  async getAllDoctorListService(hosId, depId, depTwoId) {
    let statement;
    let result
    if (hosId && depId && depTwoId) {
      statement = 'SELECT d.id,d.`name` as doctorName,d.jobId,f.`name` as depOneName,d.depId,d.roleId,s.`name` as depTwoName,d.hosId,d.state,d.avatar as picture,d.regMoney,d.password,d.brief,d.createTime,d.updateTime,h.`name` as hosName,s.`id` as depTwoId FROM doctor d LEFT JOIN hospital h ON d.hosId= h.id LEFT JOIN depone f ON d.depId = f.id LEFT JOIN deptwo s ON d.depTwoId = s.id WHERE d.hosId=? AND d.depId=? AND d.depTwoId=?;'
      result = await connection.execute(statement, [hosId, depId, depTwoId])
    } else if (hosId && depId) {
      statement = 'SELECT d.id,d.`name` as doctorName,d.jobId,f.`name` as depOneName,d.depId,d.roleId,s.`name` as depTwoName,d.hosId,d.state,d.avatar as picture,d.regMoney,d.password,d.brief,d.createTime,d.updateTime,h.`name` as hosName,s.`id` as depTwoId FROM doctor d LEFT JOIN hospital h ON d.hosId= h.id LEFT JOIN depone f ON d.depId = f.id LEFT JOIN deptwo s ON d.depTwoId = s.id;'
      result = await connection.execute(statement, [hosId])
    } else if (hosId && depTwoId) {
      statement = 'SELECT d.id,d.`name` as doctorName,d.jobId,f.`name` as depOneName,d.depId,d.roleId,s.`name` as depTwoName,d.hosId,d.state,d.avatar as picture,d.regMoney,d.password,d.brief,d.createTime,d.updateTime,h.`name` as hosName,s.`id` as depTwoId FROM doctor d LEFT JOIN hospital h ON d.hosId= h.id LEFT JOIN depone f ON d.depId = f.id LEFT JOIN deptwo s ON d.depTwoId = s.id;'
      result = await connection(statement, [depId])
    } else {
      statement = 'SELECT d.id,d.`name` as doctorName,d.jobId,f.`name` as depOneName,d.depId,d.roleId,s.`name` as depTwoName,d.hosId,d.state,d.avatar as picture,d.regMoney,d.password,d.brief,d.createTime,d.updateTime,h.`name` as hosName,s.`id` as depTwoId FROM doctor d LEFT JOIN hospital h ON d.hosId= h.id LEFT JOIN depone f ON d.depId = f.id LEFT JOIN deptwo s ON d.depTwoId = s.id;'
      result = await connection.execute(statement)
    }

    return result[0]
  }

  // *2.添加医生
  async addDoctorService(name, jobId, password, hosId, depId, depTwoId, roleId, state, brief, regMoney, picture) {
    const statement = 'INSERT INTO doctor (`name`,`jobId`,`password`,`hosId`,`depId`,`depTwoId`,`roleId`,`state`,`brief`,`regMoney`,`avatar`) VALUES (?,?,?,?,?,?,?,?,?,?,?);'

    const result = await connection.execute(statement, [name, jobId, password, hosId, depId, depTwoId, roleId, state, brief, regMoney, picture])
    return result[0]
  }

  // *3.删除医生
  async removeDoctorService(id) {
    const statement = 'DELETE FROM doctor WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }

  // *4.修改医生信息
  async updateDoctorService(name, jobId, password, hosId, depId, depTwoId, roleId, state, brief, regMoney, picture, id) {
    const statement = 'UPDATE doctor SET `name`=?,`jobId`=?,`password`=?,`hosId`=?,`depId`=?,`depTwoId`=?,`roleId`=?,`state`=?,`brief`=?,`regMoney`=?,`avatar`=? WHERE `id`=?;'

    const result = await connection.execute(statement, [name, jobId, password, hosId, depId, depTwoId, roleId, state, brief, regMoney, picture, id])
    return result[0]
  }

  // *5.根据工号找医生信息
  async findDoctorInfoByJobId(jobId) {
    const statement = 'SELECT * FROM doctor WHERE jobId=?;'

    const result = await connection.execute(statement, [jobId])
    return result[0]
  }
}

module.exports = new DoctorModel()