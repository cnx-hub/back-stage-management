import NXRequest from './request'

import { BASE_URL, BASE_NAME } from './request/config'
import cache from '@/utils/cache'

const nxRequest = new NXRequest({
  baseURL: BASE_URL,
  timeout: BASE_NAME,
  interceptors: {
    requestInterceptor: (config) => {
      const token = cache.getCache('token') ?? ''
      if (token) {
        // 将token携带进去
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败拦截')
      return err
    },
    responsetInterceptor: (res) => {
      // console.log('响应成功拦截')
      return res
    }
    // responseInterceptorCatch: (err) => {
    //   return err
    // }
  }
})

export default nxRequest
