module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    scripts: {
      'build-test': 'vue-cli-service build --mode test',
      'push-test': 'node ./shell.js test',
      'push-production': 'node ./shell.js production'
    },
    dependencies: {
      axios: '^0.19.0',
      shelljs: '^0.8.3'
    },
    devDependencies: {
      'compression-webpack-plugin': '^3.0.0'
    }
  })

  if (options.module === 'pc') {
    api.extendPackage({
      dependencies: {
        'element-ui': '^2.12.0'
      },
      devDependencies: {
        'babel-plugin-component': '^1.1.1'
      }
    })
  } else if (options.module === 'mobile') {
    api.extendPackage({
      dependencies: {
        vant: '^2.4.7'
      }
    })
  }

  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('../template')

  api.render((files, render) => {
    delete files['src/views/About.vue']
    delete files['src/components/HelloWorld.vue']
    if (options.module === 'pc') {
      files['babel.config.js'] = files['babel.config.pc.js']
      files['src/main.js'] = files['src/main.pc.js']
      files['src/utils/axios.js'] = files['src/utils/axios.pc.js']
      delete files['src/utils/rem.js']
    } else if (options.module === 'mobile') {
      files['babel.config.js'] = files['babel.config.mobile.js']
      files['src/main.js'] = files['src/main.mobile.js']
      files['src/utils/axios.js'] = files['src/utils/axios.mobile.js']
    }
    delete files['src/main.pc.js']
    delete files['src/main.mobile.js']
    delete files['src/utils/axios.pc.js']
    delete files['src/utils/axios.mobile.js']
    delete files['babel.config.pc.js']
    delete files['babel.config.mobile.js']
  })
}
