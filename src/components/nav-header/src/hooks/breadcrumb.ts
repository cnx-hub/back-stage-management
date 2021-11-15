import { computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapToMeun } from '@/utils/map-menus'

export function getMenu() {
  const store = useStore()
  const breadcrumbs: any = computed(() => {
    const Route = useRoute()
    // return getMenu(store.state.login.menu, Route.path)
    return pathMapToMeun(store.state.login.menu, Route.path, [])
  })

  return breadcrumbs
}
