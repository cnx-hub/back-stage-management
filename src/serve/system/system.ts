import nxRequest from '@/serve'
import { IDataType } from './type'

export function getPageListData(url: string, queryInfo: any) {
  return nxRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// url: /user/id
export function deletePageData(url: string) {
  return nxRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return nxRequest.post<IDataType>({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return nxRequest.patch<IDataType>({
    url,
    data: editData
  })
}
