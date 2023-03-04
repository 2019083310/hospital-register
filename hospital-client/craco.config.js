const path = require('path')
const CracoLessPlugin = require('craco-less')

const pathName = (pathName) => path.join(__dirname, pathName)

module.exports = {
  // less相关
  plugins: [{
    plugin: CracoLessPlugin,
  }, ],
  // webpack相关
  webpack: {
    alias: {
      '@': pathName('src'),
      'views': pathName('src/views'),
      'utils': pathName('src/utils'),
      'components': pathName('src/components'),
    }
  }
}