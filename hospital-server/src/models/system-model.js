const connection = require('../app/database')

class SystemModel {
  // *1.增加系统菜单
  async addSystemMenu(name, url, level, key) {
    const statement = `INSERT INTO menu (name,url,level,key) VALUES (?,?,?,?,?);`

    const result = await connection.execute(statement, [name, url, level, key])

    return result
  }
}

module.exports = new SystemModel()