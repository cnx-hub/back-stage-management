import { ref } from 'vue'
export function getMenuId() {
  // 获取menu中的对应id
  const otherInfo = ref({})
  const handleCheckChange: any = (data1: any, data2: any) => {
    // 选中和半选中的状态
    const { checkedKeys, halfCheckedKeys } = data2
    const menuList = [...checkedKeys, ...halfCheckedKeys]
    otherInfo.value = { menuList }
  }

  return [otherInfo, handleCheckChange]
}
