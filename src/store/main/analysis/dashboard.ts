import { Module } from 'vuex'
import { IDashboardState } from './type'
import { IRootState } from '../../type'
import {
  getCategoryGoodsCount,
  getAddressGoodsSale,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getGoodsSaleTop10,
  getAmountList
} from '@/serve/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: [],
      topPanelDatas: [],
      goodsSaleTop10: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list: any[]) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list: any[]) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list: any[]) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list: any[]) {
      state.addressGoodsSale = list
    },
    changeTopPanelDatas(state, list: any[]) {
      state.topPanelDatas = list
    },
    changeGoodsSaleTop10(state, list: any[]) {
      state.goodsSaleTop10 = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      // 1.请求数据
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)
      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      const addressGoodsResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsResult.data)
      const saleTop10 = await getGoodsSaleTop10()
      commit('changeGoodsSaleTop10', saleTop10.data)
      const resultTopPanelDatas = await getAmountList()
      commit('changeTopPanelDatas', resultTopPanelDatas.data)
    }
  }
}

export default dashboardModule
