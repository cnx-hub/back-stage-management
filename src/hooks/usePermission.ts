import { useStore } from '@/store'

// pageName为某个页面  handleName为哪个功能
export function usePermission(pageName: string, handleName: string): any {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermission)
}
