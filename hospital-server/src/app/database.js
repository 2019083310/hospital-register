// ?数据库连接池
// *连接池的作用:资源重用,更快地响应速度,新的资源分配手段,统一的连接管理
const {
  createPool
} = require('mysql2')
const config = require('./config')

const connection = createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER_NAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
})

connection.getConnection((err, conn) => {
  if (err) {
    console.log('数据库连接失败',err)
  } else {
    console.log('数据库连接成功')
  }
})

// *数据库promise化
module.exports=connection.promise()