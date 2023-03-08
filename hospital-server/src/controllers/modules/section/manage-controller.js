// ?系统管理员操作系统设置
const fs = require('fs')
const filepath = require('../../../common/filepath')
const manageModel = require('../../../models/modules/section/manage-model')
const fileModel = require('../../../models/file-model')

class ManageController {
  // *1.获取北京市所有区
  async getAllFieldCont(ctx, next) {
    let result

    try {
      result = await manageModel.getAllFieldService()
    } catch (error) {
      const err = new Error(error.message)
      return ctx.app.emit('error', ctx, err)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *2.添加医院
  async addHospitalCont(ctx, next) {
    let result

    try {
      const {
        name,
        levelText,
        field,
        open,
        openTimeText,
        picture
      } = ctx.request.body

      // 插入数据
      // console.log(name,levelText,field,open,openTimeText,picture)
      result = await manageModel.addHospitalService(name, levelText, field, open, openTimeText, picture)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *3.获取医院列表
  async getHospitalListCont(ctx, next) {
    let result

    try {
      // 获取数据
      result = await manageModel.getHospitalListService()
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *4.删除医院
  async removeHosCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params

      // 先把医院logo删除
      // const res = await manageModel.getHosInfoByIdService(id)

      // const picture = res[0]?.picture
      // const lastIndex = picture?.lastIndexOf("/");
      // const pictureId = picture?.slice(lastIndex + 1);

      // 查找pictureId对应的图片信息
      // const pictureInfo = await fileModel.getHosLogoService(pictureId)

      // if (pictureInfo.length) {
        // 移除目录下的文件
      //   fs.rmSync(`${filepath.PICTURE_PATH}/${pictureInfo[0].filename}`, {
      //     force: true
      //   })

      //   // 去数据库查找文件的信息
      //   await fileModel.removeHosLogoService(pictureId)
      // }

      // 删除医院数据
      result = await manageModel.removeHosService(id)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }

  // *5.修改医院信息
  async updateHosCont(ctx, next) {
    let result

    try {
      // 获取数据
      const {
        id
      } = ctx.request.params
      const {
        name,
        levelText,
        field,
        open,
        openTimeText,
        picture
      } = ctx.request.body

      // 修改医院数据
      result = await manageModel.updateHosService(name, levelText, field, open, openTimeText, picture, id)
    } catch (error) {
      return ctx.app.emit('error', ctx, error)
    }

    ctx.status = 200
    ctx.body = {
      code: 1,
      result
    }
  }
}

module.exports = new ManageController()