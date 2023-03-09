const connection = require('../../../app/database')

class DepTwoModel {
  // *1.获取所有二级科室门诊列表
  async getAllDepTwoListService(hosId) {
    let statement = 'SELECT d.id,d.`name` as depTwoName,f.`name` as depOneName,d.hosId,d.depId,d.state,d.address,d.createTime,d.updateTime,h.`name` as hosName FROM deptwo d LEFT JOIN hospital h ON d.hosId= h.id LEFT JOIN depone f ON d.depId = f.id WHERE hosId=?;'
    let result
    if (hosId) {
      result = await connection.execute(statement, [hosId])
    } else {
      statement = 'SELECT d.id,d.`name` as depTwoName,f.`name` as depOneName,d.depId,d.hosId,d.state,d.address,d.createTime,d.updateTime,h.`name` as hosName FROM deptwo d LEFT JOIN hospital h ON d.hosId= h.id LEFT JOIN depone f ON d.depId = f.id;'
      result = await connection.execute(statement)
    }

    return result[0]
  }

  // *2.添加科室/门诊
  async addDepTwoService(name, state, hosId, depId, address) {
    const statement = 'INSERT INTO deptwo (`name`,`state`,`hosId`,`depId`,`address`) VALUES (?,?,?,?,?);'

    const result = await connection.execute(statement, [name, state, hosId, depId, address])
    return result[0]
  }

  // *3.删除二级科室/门诊
  async removeDepTwoService(id) {
    const statement = 'DELETE FROM deptwo WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }

  // *4.修改二级科室/门诊信息
  async updateDepTwoInfoService(name, state, hosId, depId, address, id) {
    const statement = 'UPDATE deptwo SET `name`=?,`hosId`=?,`depId`=?,`state`=?,`address`=? WHERE `id`=?;'

    const result = await connection.execute(statement, [name, hosId, depId, state, address, id])
    return result[0]
  }
}

module.exports = new DepTwoModel()