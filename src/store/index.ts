import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import analysis from './main/analysis/dashboard'
import { getPageListData } from '@/serve/system/system'

const stores = createStore<IRootState>({
  state: () => {
    return {
      name: 'why',
      age: 18,
      enterDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list: any[]) {
      state.enterDepartment = list
    },
    changeEntireRole(state, list: any[]) {
      state.entireRole = list
    },
    changeEntireMenu(state, list: any[]) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      // 2.获取menu数据
      const menuListResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuListResult.data

      // 3.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  getters: {},
  modules: {
    login,
    system,
    analysis
  }
})

export function setupStore() {
  stores.dispatch('login/loadLocalLogin')
  stores.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore<IStoreType>()
}

export default stores
