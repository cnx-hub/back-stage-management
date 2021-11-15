import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { NXrequestInterceptors, NXRequestConfig } from './type'

import { ElLoading, ILoadingInstance } from 'element-plus'

const DEFAULT_LOADING = true

class NXRequest {
  instance: AxiosInstance
  interceptors?: NXrequestInterceptors
  showloading: boolean
  Loading?: ILoadingInstance

  constructor(config: NXRequestConfig) {
    //  创建 axios实例对象
    this.instance = axios.create(config)
    // 初始化对应
    this.interceptors = config.interceptors
    this.showloading = config.showLoding ?? DEFAULT_LOADING
    // 自定义对应请求的拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responsetInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例的拦截
    this.instance.interceptors.request.use(
      (config) => {
        //请求过程中添加loading
        if (this.showloading) {
          this.Loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }

        return config
      },
      (err) => {
        // console.log('所有实例请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 取消loading
        if (this.showloading) {
          this.Loading?.close()
        }
        const data = res.data

        if (data.returnCode == '-1001') {
          console.log('请求失败,错误信息')
        } else {
          return data
        }
      },
      (err) => {
        if (this.showloading) {
          this.Loading?.close()
        }
        // 判断请求  显示不同的错误信息
        if (err.response.status === '404') {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request<T = any>(config: NXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求  单独做拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.是否显示Loading
      this.showloading = config.showLoding ?? DEFAULT_LOADING

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个响应 响应做拦截
          if (config.interceptors?.responsetInterceptor) {
            res = config.interceptors.responsetInterceptor(res)
          }
          // 不会影响下一次请求的Loading被取消
          this.showloading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 不会影响下一次请求的Loading被取消
          this.showloading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: NXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: NXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: NXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: NXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default NXRequest
