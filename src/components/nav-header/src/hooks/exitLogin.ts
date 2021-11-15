import cache from '@/utils/cache'
import { useRouter } from 'vue-router'
export function exitLogin() {
  const router = useRouter()
  const handleExitClick = () => {
    cache.deleteCache('token')
    router.push('/main')
  }
  return [handleExitClick]
}
