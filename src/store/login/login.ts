import type { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../type'

import router from '@/router'
import { mapMenusToRoutes, mapMeunsToPermission } from '@/utils/map-menus'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenu
} from '@/serve/login/login'
import cache from '@/utils/cache'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      menu: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
      cache.setCache('token', state.token)
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
      cache.setCache('userInfo', payload)
    },
    changeMenu(state, payload: any) {
      state.menu = payload
      cache.setCache('userMenus', payload)
      // 实现动态的注册路由
      const routes = mapMenusToRoutes(state.menu)
      routes.map((route) => {
        // 对子路由的路径进行修改
        route.path = route.path.slice(6)
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permission = mapMeunsToPermission(state.menu)
      state.permissions = permission
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: any) {
      // 实现登录逻辑
      // 1.发送登录请求
      const loginResult = await accountLoginRequest(payload)
      const { token, id } = loginResult.data
      dispatch('getInitialDataAction', null, { root: true })
      commit('changeToken', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)

      // 3.请求用户的菜单
      const userMenuResult = await requestUserMenu(id)
      const userMenus = userMenuResult.data
      commit('changeMenu', userMenus)

      // 4.跳转到main页面
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = cache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 拿到token之后发送初始化的请求
        dispatch('getInitialDataAction', null, { root: true })
      }

      const userInfo = cache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = cache.getCache('userMenus')
      if (userMenus) {
        commit('changeMenu', userMenus)
      }
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行了phoneLoginAction', payload)
    // }
  },
  getters: {}
}

export default loginModule
