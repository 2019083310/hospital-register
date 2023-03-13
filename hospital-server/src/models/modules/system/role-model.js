const connection = require('../../../app/database')

class RoleModel {
  // *1.添加角色
  async addRoleService(name, desc, menu) {
    const statement = 'INSERT INTO role (`name`,`desc`,`menu`) VALUES (?,?,?);'

    const result = await connection.execute(statement, [name, desc, menu])

    return result[0]
  }

  // *2.获取角色列表
  async getRoleListService(roleId) {
    let result
    if (roleId) {
      const statement = 'SELECT * FROM role WHERE id=?;'
      result = await connection.execute(statement, [roleId])
    } else {
      const statement = 'SELECT * FROM role;'
      result = await connection.execute(statement)
    }

    return result[0]
  }

  // *3.删除角色
  async removeRoleService(id) {
    const statement = 'DELETE FROM role WHERE `id`=?;'

    const result = await connection.execute(statement, [id])

    return result[0]
  }

  // *4.更改角色
  async updateRoleService(name, desc, menu, id) {
    let statement
    let result
    if (name.length) {
      statement = 'UPDATE role SET `name`=?,`desc`=?,`menu`=? WHERE `id`=?;'
      result = await connection.execute(statement, [name, desc, menu, id])
    } else {
      statement = 'UPDATE role SET `desc`=?,`menu`=? WHERE `id`=?;'
      result = await connection.execute(statement, [desc, menu, id])
    }

    return result[0]
  }

  // *查找是否已经存在name
  async getRoleNameService(name) {
    const statement = 'SELECT * FROM role WHERE `name`=?;'

    const result = await connection.execute(statement, [name])

    return result[0]
  }
}

module.exports = new RoleModel