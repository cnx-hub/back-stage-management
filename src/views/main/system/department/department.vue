<template>
	<div class="department">
		<page-search
			:searchFormConfig="searchFormConfig"
			@resetBtnClick="handleResetBtnClick"
			@queryBtnClick="handleQueryBtnClick"
		></page-search>

		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="department"
			ref="pageContentRef"
			title="新建部门"
			@newBtnClick="handleNewData"
			@editBtnClick="handleEditData"
		></page-content>

		<page-modal
			:modalConfig="modalConfigRef"
			pageName="department"
			ref="pageModalRef"
			:defaultInfo="defaulInfo"
		></page-modal>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue'
	import { useStore } from '@/store'

	import pageSearch from '@/components/page-search'
	import pageContent from '@/components/page-content'
	import pageModal from '@/components/page-modal'

	import { searchFormConfig } from './config/search.config'
	import { contentTableConfig } from './config/content.config'
	import { modalConfig } from './config/modal.config'

	import { usePageSearch } from '@/hooks/usePageSearch'
	import { usePageModal } from '@/hooks/usePageModal'

	const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
		usePageSearch()
	const [pageModalRef, defaulInfo, handleNewData, handleEditData] = usePageModal()
	// 2.动态获取部门 使用computed来监听store中数据的改变
	const store = useStore()
	const modalConfigRef = computed(() => {
		const parentIdItem = modalConfig.formItems?.find(
			(item) => item.field === 'parentId'
		)
		parentIdItem!.options = store.state.enterDepartment.map((item) => {
			return { label: item.name, value: item.id }
		})
		return modalConfig
	})
</script>

<style scoped></style>
