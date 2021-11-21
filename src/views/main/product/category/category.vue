<template>
	<div class="category">
		<el-row :gutter="10">
			<el-col :span="24">
				<nx-card title="商品占比分析">
					<ring-echart></ring-echart>
				</nx-card>
			</el-col>
		</el-row>

		<div class="search">
			<page-search
				:searchFormConfig="searchFormConfig"
				@resetBtnClick="handleResetBtnClick"
				@queryBtnClick="handleQueryBtnClick"
			></page-search>
		</div>

		<page-content
			ref="pageContentRef"
			title="新建类别"
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
	import nxCard from '@/base-ui/card'
	import ringEchart from '@/components/page-echarts/src/ring-echart.vue'

	import { searchFormConfig } from './config/search.config'
	import { contentTableConfig } from './config/content.config'
	import { modalConfig } from './config/modal.config'

	import { usePageSearch } from '@/hooks/usePageSearch'
	import { usePageModal } from '@/hooks/usePageModal'

	const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
		usePageSearch()

	const [pageModalRef, defaulInfo, handleNewData, handleEditData] = usePageModal()
</script>

<style scoped>
	.search {
		border-top: 20px solid #f5f5f5;
	}
</style>
