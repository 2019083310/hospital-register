const connection = require('../../../app/database')

class AdminModel {
  // *1.获取所有管理员列表
  async getAllAdminListService() {
    let statement = 'SELECT a.`id`,a.`username`,a.`avatar` as picture,a.`password`,a.`state`,r.`name` as roleName,r.id as roleId,a.`createTime`,a.`updateTime` FROM admin a LEFT JOIN role r ON a.roleID =r.id; '
    let result = await connection.execute(statement)

    return result[0]
  }

  // *2.添加管理员
  async addAdminService(username, password, roleId, state, picture) {
    const statement = 'INSERT INTO admin (`username`,`password`,`roleId`,`state`,`avatar`) VALUES (?,?,?,?,?);'

    const result = await connection.execute(statement, [username, password, roleId, state, picture])
    return result[0]
  }

  // *3.删除管理员
  async removeAdminService(id) {
    const statement = 'DELETE FROM admin WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }

  // *4.修改管理员信息
  async updateAdminService(username, password, roleId, state, picture, id) {
    const statement = 'UPDATE admin SET `username`=?,`password`=?,`roleId`=?,`state`=?,`avatar`=? WHERE `id`=?;'

    const result = await connection.execute(statement, [username, password, roleId, state, picture, id])
    return result[0]
  }

  // *5.根据用户名找管理员
  async findAdminByUserName(username) {
    const statement = 'SELECT * FROM admin WHERE username=?;'

    const result = await connection.execute(statement, [username])
    return result[0]
  }
}

module.exports = new AdminModel()