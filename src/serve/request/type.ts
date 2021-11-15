import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建一个interceptors函数的接口
export interface NXrequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responsetInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface NXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: NXrequestInterceptors<T>
  showLoding?: boolean
}
