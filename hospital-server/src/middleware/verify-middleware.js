const jwt = require('jsonwebtoken')
const config = require('../app/config')
const errorTypes = require('../common/error.types')

// ?生成token
const generateToken = (info) => {
  const token = jwt.sign(info, config.privateKey, {
    algorithm: 'RS256',
    expiresIn: 60 * 60 * 24 * 10
  })

  return token
}

// ?验证token
const verifyToken = async (ctx, next) => {
  const token = ctx.request.headers.authorization
  if (!token) {
    return ctx.app.emit('error', ctx, errorTypes.TOKEN_NOT_EXISTS)
  }

  let ret

  try {
    ret = jwt.verify(token, config.publicKey, {
      algorithms: ['RS256']
    })
  } catch (error) {
    return ctx.app.emit('error', ctx, error.message)
  }

  ctx.ret = ret
  await next()
}

module.exports = {
  generateToken,
  verifyToken
}