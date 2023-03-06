const connection = require('../../../app/database')

class SystemModel {
  // *1.增加系统菜单
  async addSystemMenu(name, url, level, key) {
    const statement = 'INSERT INTO menu (`name`,`url`,`level`,`key`) VALUES (?,?,?,?);'

    try {
      const result = await connection.execute(statement, [name, url, level, key])

      return result[0]
    } catch (error) {
      return error.message
    }
  }

  // *2.请求系统菜单
  async getSystemMenu() {
    const statement = 'SELECT * FROM menu;'

    try {
      const result = await connection.execute(statement)

      return result[0]
    } catch (error) {
      return error.message
    }
  }

  // *3.删除系统菜单
  async removeSystemMenu(id) {
    const statement = 'DELETE FROM menu WHERE `id`=?;'

    try {
      const result = connection.execute(statement, [id])

      return result[0]
    } catch (error) {
      return error.message
    }
  }

  // *4.删除系统一级菜单
  async removeSystemFirstMenu(key) {
    const statement = 'DELETE FROM menu WHERE `key`=?;'

    try {
      const result = connection.execute(statement, [key])

      return result[0]
    } catch (error) {
      return error.message
    }
  }
}

module.exports = new SystemModel()