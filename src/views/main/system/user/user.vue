<template>
	<div class="user">
		<pageSearch
			:searchFormConfig="searchFormConfig"
			@resetBtnClick="handleResetBtnClick"
			@queryBtnClick="handleQueryBtnClick"
		></pageSearch>
		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="users"
			title="新建用户"
			ref="pageContentRef"
			@newBtnClick="handleNewData"
			@editBtnClick="handleEditData"
		></page-content>
		<page-modal
			:defaultInfo="defaulInfo"
			:modalConfig="modalConfigRef"
			ref="pageModalRef"
			pageName="users"
		></page-modal>
	</div>
</template>

<script lang="ts" setup>
	import { useStore } from '@/store'
	import { computed } from 'vue'

	import pageModal from '@/components/page-modal'
	import pageSearch from '@/components/page-search'
	import pageContent from '@/components/page-content'

	import { searchFormConfig } from '@/views/main/system/user/config/search.config'
	import { contentTableConfig } from '@/views/main/system/user/config/content.config'
	import { modalConfig } from './config/modal.config'
	import { usePageSearch } from '@/hooks/usePageSearch'
	import { usePageModal } from '@/hooks/usePageModal'
	// 1.调用pagecontent的hooks
	let [pageContentRef, handleResetBtnClick, handleQueryBtnClick] = usePageSearch()
	// 2.动态获取部门和角色列表  使用computed来监听store中数据的改变
	const store = useStore()
	const modalConfigRef = computed(() => {
		const departmentItem = modalConfig.formItems.find(
			(item: any) => item.field === 'departmentId'
		)
		departmentItem.options = store.state.enterDepartment.map((item) => ({
			title: item.name,
			value: item.id
		}))
		
    const roleItem = modalConfig.formItems.find(
			(item: any) => item.field === 'roleId'
		)
		roleItem.options = store.state.entireRole.map((item) => ({
			title: item.name,
			value: item.id
		}))
		return modalConfig
	})

	// 3.pageModal的hooks
	const newCb = () => {
		const passwordItem = modalConfig.formItems.find(
			(item: any) => item.field === 'password'
		)
		passwordItem.isHidden = false
	}

	const editCb = () => {
		const passwordItem = modalConfig.formItems.find(
			(item: any) => item.field === 'password'
		)
		passwordItem.isHidden = true
	}
	let [pageModalRef, defaulInfo, handleNewData, handleEditData] = usePageModal(
		newCb,
		editCb
	)
</script>

<style scoped lang="less">
</style>
