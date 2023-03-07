const connection = require('../../../app/database')

class ManageModel {
  // *1.获取北京市所有区
  async getAllFieldService() {
    const statement = 'SELECT * FROM field;'

    const result = await connection.execute(statement)
    return result[0]
  }
}

module.exports = new ManageModel()