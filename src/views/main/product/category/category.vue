<template>
	<div class="category">
		<page-search
			:searchFormConfig="searchFormConfig"
			@resetBtnClick="handleResetBtnClick"
			@queryBtnClick="handleQueryBtnClick"
		></page-search>

		<page-content
			ref="pageContentRef"
			:contentTableConfig="contentTableConfig"
			pageName="category"
			@newBtnClick="handleNewData"
			@editBtnClick="handleEditData"
		></page-content>

		<page-modal
			ref="pageModalRef"
			:defaultInfo="defaulInfo"
			pageName="category"
			:modalConfig="modalConfig"
		></page-modal>
	</div>
</template>

<script lang="ts" setup>
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
</script>

<style scoped></style>
