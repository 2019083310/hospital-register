const connection = require('../app/database')

class FileModel {
  // *1.医院图片上传
  async uploadHosLogoService(filename, mimetype, size) {
    const statement = 'INSERT INTO picture (`filename`,`mimetype`,`size`) VALUES (?,?,?);'

    const result = await connection.execute(statement, [filename, mimetype, size])
    return result[0]
  }

  // *2.根据id查找医院logo
  async getHosLogoService(id) {
    const statement = 'SELECT * FROM picture WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }

  // *3.根据Id删除医院图片
  async removeHosLogoService(id) {
    const statement = 'DELETE FROM picture WHERE `id`=?;'

    const result = await connection.execute(statement, [id])
    return result[0]
  }
}

module.exports = new FileModel()