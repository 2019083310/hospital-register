// ?主入口
const app = require('./app/index')
require('./app/config')

// *启动数据库
require('./app/database')

app.listen(process.env.APP_PORT, () => {
  console.log(`服务器在${process.env.APP_PORT}端口启动成功~`)
})