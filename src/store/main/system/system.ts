import { Module } from 'vuex'
import type { IsystemState } from './type'
import type { IRootState } from '@/store/type'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/serve/system/system'

const userModule: Module<IsystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      departmentList: [],
      departmentTotalCount: 0,
      menuList: [],
      menuCount: 0,
      roleList: [],
      roleCount: 0,
      categoryList: [],
      categoryTotalCount: 0,
      goodsList: [],
      goodsCount: 0,
      storyTotalCount: 0,
      storyList: []
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeDepartmentTotalCount(state, totalCount: number) {
      state.departmentTotalCount = totalCount
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeCategoryList(state, list: any[]) {
      state.categoryList = list
    },
    changeCategoryTotalCount(state, count: number) {
      state.categoryTotalCount = count
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeStoryList(state, storyList: any) {
      state.storyList = storyList
    },
    changeStoryTotalCount(state, totalCount: number) {
      state.storyTotalCount = totalCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },

  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.拼接请求地址以及参数
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // 3.将数据保存在state中
      const { list, totalCount } = pageResult.data
      console.log(pageResult.data)

      switch (pageName) {
        case 'users':
          commit('changeUsersList', list)
          commit('changeUsersCount', totalCount)
          break
        case 'department':
          commit('changeDepartmentList', list)
          commit('changeDepartmentTotalCount', totalCount)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
          break
        case 'goods':
          commit('changeGoodsList', list)
          commit('changeGoodsCount', totalCount)
          break
        case 'menu':
          commit('changeMenuList', list)
          commit('changeMenuCount', totalCount)
          break
        case 'category':
          commit('changeCategoryList', list)
          commit('changeCategoryTotalCount', totalCount)
          break
        case 'story':
          commit('changeStoryList', list)
          commit('changeStoryTotalCount', totalCount)
          break
      }
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.pageName -> /users
      // 2.id -> /users/id
      const { pageName, id, pageInfo } = payload
      const pageUrl = `/${pageName}/${id}`
      // 2.调用网络请求
      await deletePageData(pageUrl)
      // 3.删除网络数据之后重新请求数据
      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: (pageInfo.currentPage - 1) * pageInfo.pageSize,
          size: pageInfo.pageSize
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建请求数据
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      // 2.请求最新的数据
      dispatch(`getPageListAction`, {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑请求数据
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch(`getPageListAction`, {
        pageName,
        query: { offset: 0, size: 10 }
      })
    }
  }
}
export default userModule
