import request from '../utils/axios'

/**
 * get请求示例
 *
 * @export
 * @param {*} param
 * @returns
 */
export function getExample (param) {
  return request({
    url: `/xxx`,
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
export function postExample (param) {
  return request({
    url: `/xxx`,
    method: 'POST',
    data: {
      param
    }
  })
}
