<template>
	<div class="role">
		<page-search
			:searchFormConfig="searchFormConfig"
			@resetBtnClick="handleResetBtnClick"
			@queryBtnClick="handleQueryBtnClick"
		></page-search>
    
		<page-content
			:contentTableConfig="contentTableConfig"
			@newBtnClick="handleNewData"
			@editBtnClick="handleEditData"
			pageName="role"
			ref="pageContentRef"
		></page-content>
		<page-modal
			pageName="role"
			:modalConfig="modalConfig"
			ref="pageModalRef"
			:defaultInfo="defaulInfo"
			:otherInfo="otherInfo"
		>
			<div class="menu-tree">
				<el-tree
					ref="elTreeRef"
					:data="menus"
					show-checkbox
					node-key="id"
					:props="{ label: 'name', children: 'children', disabled: 'false' }"
					@check="handleCheckChange"
				/>
			</div>
		</page-modal>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, nextTick } from 'vue'
	import { useStore } from '@/store'
	import { menuMapLeafKeys } from '@/utils/map-menus'
	import { ElTree } from 'element-plus'

	import pageSearch from '@/components/page-search'
	import pageContent from '@/components/page-content'
	import pageModal from '@/components/page-modal'

	import { searchFormConfig } from './config/search.config'
	import { contentTableConfig } from './config/content.config'
	import { modalConfig } from './config/modal.config'

	import { usePageModal } from '@/hooks/usePageModal'
	import { usePageSearch } from '@/hooks/usePageSearch'

	// role页面的hooks逻辑
	import { getMenuId } from './hooks/getMenuId'
	// pageSearch处理hook
	let [pageContentRef, handleResetBtnClick, handleQueryBtnClick] = usePageSearch()

	const elTreeRef = ref<InstanceType<typeof ElTree>>()
	const editCb = (item: any) => {
		const leafKeys = menuMapLeafKeys(item.menuList)
		// 当tree弹窗出来时  elTreeRef还是没有绑定成功的
		nextTick(() => {
			elTreeRef.value?.setCheckedKeys(leafKeys, false)
		})
	}
	const [pageModalRef, defaulInfo, handleNewData, handleEditData] = usePageModal(
		undefined,
		editCb
	)

	const store = useStore()
	const menus = computed(() => store.state.entireMenu)
	// 获取menu中的id
	const [otherInfo, handleCheckChange] = getMenuId()
</script>

<style scoped>
	.menu-tree {
		margin-left: 25px;
	}
</style>
