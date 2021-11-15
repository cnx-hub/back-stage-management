import nxRequest from '@/serve'
import { IDataType } from './type'

enum DashboardAPI {
  amountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
  goodsSaleTop10 = '/goods/sale/top10'
}

export function getCategoryGoodsCount() {
  return nxRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return nxRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return nxRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return nxRequest.get<IDataType>({ url: DashboardAPI.addressGoodsSale })
}

export function getAmountList() {
  return nxRequest.get<IDataType>({ url: DashboardAPI.amountList })
}

export function getGoodsSaleTop10() {
  return nxRequest.get<IDataType>({
    url: DashboardAPI.goodsSaleTop10
  })
}
