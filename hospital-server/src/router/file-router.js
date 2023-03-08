const KoaRouter = require('koa-router')

const {
  pictureResize
} = require('../middleware/file-middleware')
const {
  uploadHosLogoCont,
  getHosPictureCont,
  removeHosPictureCont
} = require('../controllers/file-controller')

const {
  pictureHandler
} = require('../middleware/file-middleware')

const fileRouter = new KoaRouter({
  prefix: '/file'
})

// *1.医院图片上传
fileRouter.post('/upload', pictureHandler, uploadHosLogoCont)

// *2.请求医院图片
fileRouter.get('/picture/fetch/:id', getHosPictureCont)

// *3.删除医院图片
fileRouter.get('/picture/remove/:id', removeHosPictureCont)

module.exports = fileRouter