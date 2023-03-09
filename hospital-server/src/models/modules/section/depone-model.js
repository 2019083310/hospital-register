const connection = require('../../../app/database')

class DepOneModel {
  // *1.获取所有科室列表
  async getAllDeponeService(hosId) {
    let statement = 'SELECT d.`id`, d.`name` as depName, h.`name` as hosName,h.levelText,d.`state`,d.hosId, d.createTime,d.updateTime FROM depone d LEFT JOIN hospital h ON h.id = d.hosId WHERE d.hosId=?;'
    let result
    if (hosId) {
      result = await connection.execute(statement, [hosId])
    } else {
      statement = 'SELECT d.`id`, d.`name` as depName, h.`name` as hosName,h.levelText,d.`state`,d.hosId, d.createTime,d.updateTime FROM depone d LEFT JOIN hospital h ON h.id = d.hosId;'
      result = await connection.execute(statement)
    }

    return result[0]
  }

  // *2.添加科室
  async addDeponeService(name, state, hosId) {
    const statement = 'INSERT INTO depone (`name`,`state`,`hosId`) VALUES (?,?,?);'

    const result = await connection.execute(statement, [name, state, hosId])
    return result[0]
  }

  // *3.删除科室
  async removeDeponeService(id) {
    const statement = 'DELETE FROM depone WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }

  // *4.修改医院信息
  async updateDeponeService(name, state, hosId, id) {
    const statement = 'UPDATE depone SET `name`=?,`hosId`=?,`state`=? WHERE `id`=?;'

    const result = await connection.execute(statement, [name, hosId, state, id])
    return result[0]
  }
}

module.exports = new DepOneModel()