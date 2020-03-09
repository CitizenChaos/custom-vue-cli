const isProduction = process.env.NODE_ENV === 'production'
let publicPath
if (
  process.env.VUE_APP_DEPLOY_MODE === 'development' ||
  process.env.VUE_APP_DEPLOY_MODE === 'test'
) {
  // 为开发环境与测试环境修改公共路径
  publicPath = '/test/index/'
} else if (process.env.VUE_APP_DEPLOY_MODE === 'production') {
  // 为生产环境修改公共路径
  publicPath = '/index/'
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
      '/example': {
        target: 'http://xxx.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/example': '/'
        }
      }
    }
  },
  productionSourceMap: false
}
