import { ILoginState } from './login/type'
import { IsystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/type'

export interface IRootState {
  name: string
  age: number
  enterDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: IsystemState
  analysis: IDashboardState
}

export type IStoreType = IRootWithModule & IRootState
