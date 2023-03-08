const multer = require('koa-multer')
const jimp = require('jimp')
const path = require('path')
const filePath = require('../common/filepath')

//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath.PICTURE_PATH)
  },
  // *默认存放的文件是没有后缀名称的，所以要加上
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})

// multer库返回一个对象
const uploadPicture = multer({
  storage
})

// 设置图片上传的数量 字段
const pictureHandler = uploadPicture.single('logo')

// ?对图片剪切做处理
const pictureResize = async (ctx, next) => {
  try {
    // 获取图片信息
    const file = ctx.req.file

    // 写入文件的目录
    const filename = file.filename.split('.')[0]
    const ext = file.filename.split('.')[1]
    const destPath = path.join(file.destination, filename)

    // 对图片处理
    jimp.read(file.path).then(image => {
      image.resize(80, 80).write(`${destPath}-normal.${ext}`)
      image.resize(320, jimp.AUTO).write(`${destPath}-middle.${ext}`)
    })

    await next()
  } catch (error) {
    return ctx.app.emit('error', error)
  }
}

module.exports = {
  pictureHandler,
  pictureResize
}