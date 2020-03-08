module.exports = [
  {
    type: 'list', // 即类型为 选择项
    name: 'module', // 名称，作为下面 generator 函数 options 的键
    message: '请选择你要生成的模板类型', // 提示语
    choices: [
      { name: 'PC端', value: 'pc' },
      { name: '移动端', value: 'mobile' }
    ],
    default: 'pc',
  }
]