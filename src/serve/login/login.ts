import nxRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  accountLogin = '/login',
  userLogin = '/users/', // /users/:id
  userMeua = '/role/' // role/:id/menu
}
// 发送登录
export function accountLoginRequest(account: IAccount) {
  return nxRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.accountLogin,
    data: account
  })
}
// 请求用户信息
export function requestUserInfoById(id: number) {
  return nxRequest.get<IDataType>({
    url: LoginAPI.userLogin + id
  })
}

export function requestUserMenu(id: number) {
  return nxRequest.get<IDataType>({
    url: LoginAPI.userMeua + id + '/menu'
  })
}
