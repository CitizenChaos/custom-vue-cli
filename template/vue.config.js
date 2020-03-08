const isProduction = process.env.NODE_ENV === 'production'
let publicPath
if (process.env.VUE_APP_DEPLOY_MODE === 'development' || process.env.VUE_APP_DEPLOY_MODE === 'test') {
  // 为开发环境与测试环境修改公共路径
  publicPath = '/test/cmsadmin/'
} else if (process.env.VUE_APP_DEPLOY_MODE === 'production') {
  // 为生产环境修改公共路径
  publicPath = '/cmsadmin/'
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath,
  configureWebpack: config => {
    if (isProduction) {
      // 为生产环境修改配置...
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    } else {
      return {
        devtool: 'source-map'
      }
    }
  },
  devServer: {
    port: 10031,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/cmstest': {
        target: 'http://cmstest.fooww.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/cmstest': '/'
        }
      }
    }
  },
  productionSourceMap: false
}
