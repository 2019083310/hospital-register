const connection = require('../../../app/database')

class ManageModel {
  // *1.获取北京市所有区
  async getAllFieldService() {
    const statement = 'SELECT * FROM field;'

    const result = await connection.execute(statement)
    return result[0]
  }

  // *2.添加医院
  async addHospitalService(name, levelText, field, open, openTimeText, picture) {
    const statement = 'INSERT INTO hospital (`name`,`levelText`,`fieldId`,`open`,`openTimeText`,`picture`) VALUES (?,?,?,?,?,?);'

    const result = await connection.execute(statement, [name, levelText, field, open, openTimeText, picture])
    return result[0]
  }

  // *3.获取医院列表
  async getHospitalListService() {
    const statement = 'SELECT h.id,h.`name`,h.picture,h.levelText,h.openTimeText,h.fieldId,h.`open`,f.`name` as fieldName FROM hospital h LEFT JOIN field f ON h.fieldID = f.id;'

    const result = await connection.execute(statement)
    return result[0]
  }

  // *4.删除医院
  async removeHosService(id) {
    const statement = 'DELETE FROM hospital WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }

  // *5.修改医院信息
  async updateHosService(name, levelText, fieldId, open, openTimeText, picture, id) {
    const statement = 'UPDATE hospital SET `name`=?,`levelText`=?,`fieldId`=?,`open`=?,`openTimeText`=?,`picture`=? WHERE `id`=?;'

    const result = await connection.execute(statement, [name, levelText, fieldId, open, openTimeText, picture, id])
    return result[0]
  }

  // *6.根据医院id获取医院相关信息
  async getHosInfoByIdService(id) {
    const statement = 'SELECT * FROM hospital WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }
}

module.exports = new ManageModel()