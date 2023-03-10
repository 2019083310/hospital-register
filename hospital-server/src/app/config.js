// ?app config信息
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

//*把.env的常量注入到process.env中 
dotenv.config()

const privateKey = fs.readFileSync(path.join(__dirname, '../private/private.key'))
const publicKey = fs.readFileSync(path.join(__dirname, '../private/public.key'))

const {
  APP_HOST,
  APP_PORT,
  MYSQL_USER_NAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
  MYSQL_HOST
} = process.env

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER_NAME,
  privateKey,
  publicKey
}