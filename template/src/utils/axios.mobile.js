'use strict'
import Vue from 'vue'
import axios from 'axios'

const config = {
  timeout: 5000
}
const _axios = axios.create(config)

_axios.CancelToken = axios.CancelToken
_axios.isCancel = axios.isCancel
_axios.all = axios.all
// let pageLoading
const pageAxiosList = new Set()
_axios.interceptors.request.use(
  function(config) {
    if (!pageAxiosList.size) {
      // axios开始
    }
    pageAxiosList.add(config.url)

    return config
  },
  function(error) {
    // axios结束
    Vue.prototype.$toast('网络出错，请重试')
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function(response) {
    const nowUrl =
      process.env.NODE_ENV === 'development'
        ? response.config.url
        : response.config.url.replace(response.config.baseURL, '/')
    if (pageAxiosList.has(nowUrl)) {
      pageAxiosList.delete(nowUrl)
    }
    if (!pageAxiosList.size) {
      // axios结束
    }
    if (response.data.isok) {
      return response.data
    } else {
      const errorMessage =
        response.data.msg && response.data.msg.length
          ? response.data.msg
          : '网络出错，请重试'
      Vue.prototype.$toast(errorMessage)
    }
    return response.data
  },
  function(error) {
    // axios结束
    if (_axios.isCancel(error)) {
      for (const item of pageAxiosList.keys()) {
        pageAxiosList.delete(item)
      }
      // axios结束
    } else {
      // axios结束
      Vue.prototype.$toast('网络出错，请重试')
    }
    return Promise.reject(error)
  }
)

const Plugin = {}
Plugin.install = function(Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default _axios
