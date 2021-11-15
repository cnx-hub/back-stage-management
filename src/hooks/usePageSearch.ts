import { ref } from 'vue'
import pageContent from '@/components/page-content'

export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleResetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryBtnClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetBtnClick, handleQueryBtnClick]
}
