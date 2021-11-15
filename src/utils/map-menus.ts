import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/type/type'

let firstMenu: any
export function mapMenusToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载全部的路由
  const allRoutes: RouteRecordRaw[] = []
  const resultFiles = require.context('../router/main', true, /\.ts/)
  resultFiles.keys().forEach((key) => {
    const routes = require('../router/main' + key.split('.')[1])
    allRoutes.push(routes.default)
  })

  // 2.根据菜单获取添加的路由
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (Menus: any[]) => {
    for (const meun of Menus) {
      if (meun.type === 2) {
        const route = allRoutes.find((route) => route.path === meun.url)
        // 将main重定向到第一个路由下
        if (!firstMenu) {
          firstMenu = route
        }
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(meun.children)
      }
    }
  }
  _recurseGetRoute(userMenu)

  return routes
}

export function pathMapToMeun(
  userMenu: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 2 && menu.url === currentPath) {
      return menu
    } else if (menu.type === 1) {
      const findMenu = pathMapToMeun(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })

        if (breadcrumbs) {
          return breadcrumbs
        } else {
          return findMenu
        }
      }
    }
  }
}

export function mapMeunsToPermission(userMenus: any[]): string[] {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)
  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}

export { firstMenu }
