// ?文件上传
const fileModel = require('../models/file-model')
const fs = require('fs')
const config = require('../app/config')
const filepath = require('../common/filepath')

class FileCont {
  // *1.医院图片上传
  async uploadHosLogoCont(ctx, next) {
    let result
    let pictureUrl

    try {
      // 获取图片信息
      const {
        filename,
        mimetype,
        size
      } = ctx.req.file
      // const name = filename.split('.')[0]

      // 操作数据库，保存图片信息
      result = await fileModel.uploadHosLogoService(filename, mimetype, size)

      // 更新用户请求图片的地址
      pictureUrl = `${config.APP_HOST}:${config.APP_PORT}/file/picture/fetch/${result.insertId}`
    } catch (error) {
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      pictureUrl
    }
  }

  // *2.请求医院图片
  async getHosPictureCont(ctx, next) {
    try {
      const {
        id
      } = ctx.request.params

      // 去数据库查找文件的信息
      const pictureInfo = await fileModel.getHosLogoService(id)

      // 读取本地文件返回
      ctx.response.set('Content-Type', pictureInfo[0].mimetype)
      ctx.body = fs.createReadStream(`${filepath.PICTURE_PATH}/${pictureInfo[0].filename}`)
    } catch (error) {
      return ctx.app.emit('error', error)
    }
  }

  // *3删除医院图片
  async removeHosPictureCont(ctx, next) {
    let result
    try {
      const {
        id
      } = ctx.request.params

      // 查找id对应的图片信息
      const pictureInfo = await fileModel.getHosLogoService(id)

      if (!pictureInfo.length) {
        return ctx.body = {
          code: -1,
          message: '图片不存在或已经删除'
        }
      }

      // 移除目录下的文件
      fs.rmSync(`${filepath.PICTURE_PATH}/${pictureInfo[0].filename}`, {
        force: true
      })

      // 去数据库查找文件的信息
      result = await fileModel.removeHosLogoService(id)
    } catch (error) {
      return ctx.app.emit('error', error)
    }

    ctx.body = {
      code: 1,
      result
    }
  }
}

module.exports = new FileCont()