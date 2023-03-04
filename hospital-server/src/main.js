// ?主入口
const app = require('./app/index')
const dotenv = require('dotenv')

//*把.env的常量注入到process.env中 
dotenv.config()

// *启动数据库
require('./app/database')

app.listen(process.env.APP_PORT, () => {
  console.log(`服务器在${process.env.APP_PORT}端口启动成功~`)
})