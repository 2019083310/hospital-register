// ?使用crypto提供的API进行加密密码
const crypto = require('crypto')

const md5Password = (password) => {
  // 使用md5加密，稍微复杂的md5处理后不能被破解
  const md5 = crypto.createHash('md5')
  // 使用md5加密后的数据是buffer形式，因此要使用digest()转化为十六进制
  return md5.update(password).digest('hex')
}

module.exports = {
  md5Password
}