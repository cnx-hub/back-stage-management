<template>
  <div class="page-content">
    <hytable
      :dataList="dataList"
      v-bind="props.contentTableConfig"
      @selection-change="props.contentTableConfig.selectChange"
      :dataCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler v-if="isCreate">
        <el-button type="primary" size="medium" @click="handleNewClick">
          {{
            title
          }}
        </el-button>
      </template>
      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          size="mini"
          :plain="true"
          @click="handleClick(scope.row)"
        >{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
      </template>
      <template #createAt="scope">{{ $filters.formatTime(scope.row.createAt) }}</template>
      <template #updateAt="scope">{{ $filters.formatTime(scope.row.updateAt) }}</template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button type="text" size="mini" v-if="isUpdate" @click="handleEditClick(scope.row)">
            <el-icon style="vertical-align: middle">
              <edit />
            </el-icon>编辑
          </el-button>
          <el-button type="text" size="mini" v-if="isDelete" @click="handleDeleteClick(scope.row)">
            <el-icon style="vertical-align: middle">
              <delete-filled />
            </el-icon>删除
          </el-button>
        </div>
      </template>
      <!-- 在pageContent中动态插入剩余插槽 -->
      <template v-for="item in otherPropSlot" :key="item.prop" #[item.slotName]="scope">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
      <!--  -->
    </hytable>
  </div>
</template>


<script lang="ts" setup>
import { defineEmits } from 'vue'
import { Edit, DeleteFilled } from '@element-plus/icons'
import hytable from '@/base-ui/table'
import {
  defineProps,
  withDefaults,
  computed,
  defineExpose,
  ref,
  watch
} from 'vue'
import { useStore } from '@/store'

import { usePermission } from '@/hooks/usePermission'
// 1.获取props中的数据
const props = withDefaults(
  defineProps<{ contentTableConfig: any; pageName: string; title?: string }>(),
  {
    contentTableConfig: () => ({}),
    pageName: '',
    title: ''
  }
)

const emits = defineEmits<{
  (e: 'newBtnClick'): void
  (e: 'editBtnClick', item: any): void
}>()

const store = useStore()
// 2.双向绑定  在hytable中绑定
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())
// 5.获取权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

// 发送网路请求
const getPageData = (queryInfo: any = {}) => {
  if (props.pageName !== 'story') {
    if (!isQuery) return
  }
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()

// 3.从vuex中获取数据
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
)
console.log(dataList.value);

const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
)
// 4.获取其他的动态插槽名称
const otherPropSlot = props.contentTableConfig?.propList.filter((item: any) => {
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  if (item.slotName === 'status') return false
  if (item.slotName) return true
})
// 5.处理状态
// 6.删除/编辑/新建操作
const handleDeleteClick = (item: any) => {
  alert(`确定删除用户${item.name}`)
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id,
    pageInfo: pageInfo.value
  })
}
const handleEditClick = (item: any) => {
  emits('editBtnClick', item)
}
const handleNewClick = () => {
  emits('newBtnClick')
}

const handleClick = (item: any) => {

  store.commit('system/changeUserEnable', item)
}
// 暴露属性/方法
defineExpose({
  getPageData
})
</script>


<style lang="less" scoped>
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
