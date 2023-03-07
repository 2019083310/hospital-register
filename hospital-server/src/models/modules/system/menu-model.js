const connection = require('../../../app/database')

class SystemModel {
  // *1.增加系统菜单
  async addSystemMenu(name, url, level, key) {
    const statement = 'INSERT INTO menu (`name`,`url`,`level`,`key`) VALUES (?,?,?,?);'

    const result = await connection.execute(statement, [name, url, level, key])
    return result[0]
  }

  // *2.请求系统菜单
  async getSystemMenu() {
    const statement = 'SELECT * FROM menu;'

    const result = await connection.execute(statement)
    return result[0]
  }

  // *3.删除系统菜单
  async removeSystemMenu(id) {
    const statement = 'DELETE FROM menu WHERE `id`=?;'

    const result = connection.execute(statement, [id])
    return result[0]
  }

  // *4.删除系统一级菜单
  async removeSystemFirstMenu(key) {
    const statement = 'DELETE FROM menu WHERE `key`=?;'

    const result = connection.execute(statement, [key])
    return result[0]
  }

  // *5.修改系统菜单
  async updateSystemMenu(id, name, url, level, key) {
    const statement = 'UPDATE menu SET `name`=?,`url`=?,`level`=?,`key`=? WHERE `id`=?;'

    const result = connection.execute(statement, [name, url, level, key, id])
    return result[0]
  }

  // *6.为二级menu获取父级menu的key
  async getFatherName(key) {
    const statement = 'SELECT `name` FROM menu WHERE `level`= ? AND `key`=?; '

    const result = await connection.execute(statement, [1, key])
    return result[0]
  }

  // *7.判断菜单的level
  async verifyMenuLevel(id) {
    const statement = 'SELECT `level` FROM menu WHERE `id`= ?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }
}

module.exports = new SystemModel()