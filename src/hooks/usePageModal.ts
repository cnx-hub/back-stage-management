import { ref } from 'vue'
import pageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn): any {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaulInfo = ref({})

  const handleNewData = () => {
    defaulInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 判断是否有传cb
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    console.log(item)

    defaulInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 判断是否有传cb
    editCb && editCb(item)
  }
  return [pageModalRef, defaulInfo, handleNewData, handleEditData]
}
