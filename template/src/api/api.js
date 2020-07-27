import request from '../utils/axios'

const environment = process.env.VUE_APP_DEPLOY_MODE
let prefix
if (environment === 'development' || environment === 'testing') {
  prefix = '/test'
} else if (environment === 'production') {
  prefix = '/api'
}
/**
 * get请求示例
 *
 * @export
 * @param {*} param
 * @returns
 */
export function getExample(param) {
  return request({
    url: `${prefix}/xxx`,
    method: 'GET',
    params: {
      param
    }
  })
}

/**
 * post请求示例
 *
 * @export
 * @param {*} param
 * @returns
 */
export function postExample(param) {
  return request({
    url: `${prefix}/xxx`,
    method: 'POST',
    data: {
      param
    }
  })
}
