// node命令参数列表
const argv = process.argv.splice(2)
const shell = require('shelljs')

// 检查控制台是否以运行`git `开头的命令
if (!shell.which('git')) {
  shell.echo('请安装git')
  shell.exit(1)
}

if (argv[0] === 'test') {
  if (
    shell.exec('git symbolic-ref --short -q HEAD').stdout.trim() !== 'master'
  ) {
    // 先打包，如果没问题再提交
    shell.echo('**********正在打包**********')
    if (shell.exec('npm run build-test').code !== 0) {
      // 执行npm run build-test 命令
      shell.echo('提交失败')
      shell.exit(1)
    }
    shell.echo('**********打包成功，正在提交**********')
    shell.exec('git add .')
    shell.exec("git commit -m 'autocommit'")
    shell.exec('git push')
  } else {
    shell.echo('master分支请勿运行push-test')
    shell.exit(1)
  }
} else if (argv[0] === 'production') {
  if (
    shell.exec('git symbolic-ref --short -q HEAD').stdout.trim() === 'master'
  ) {
    // 先打包，如果没问题再提交
    shell.echo('**********正在打包**********')
    if (shell.exec('npm run build').code !== 0) {
      // 执行npm run build 命令
      shell.echo('提交失败')
      shell.exit(1)
    }
    shell.echo('**********打包成功，正在提交**********')
    shell.exec('git add .')
    shell.exec("git commit -m 'autocommit'")
    shell.exec('git push')
  } else {
    shell.echo('非master分支请勿运行push-production')
    shell.exit(1)
  }
}
