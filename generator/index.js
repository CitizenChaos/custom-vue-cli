module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    scripts: {
      'build-test': 'vue-cli-service build --mode test'
    },
    dependencies: {
      'axios': '^0.19.0'
    },
    devDependencies: {
      'compression-webpack-plugin': '^3.0.0'
    }
  })

  if (options.module === 'PC') {
    api.extendPackage({
      dependencies: {
        'element-ui': '^2.12.0'
      }
    })
  } else if (options.module === 'mobile') {
    api.extendPackage({
      dependencies: {
        'vant': '^2.4.7'
      }
    })
  }

  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('../template')
}
