<template>
	<div class="nav-header">
		<i
			class="fold-menu"
			:class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
			@click="handleFoldClick"
		></i>
		<div class="content">
			<div class="breadcrumb">
				<hy-breadcrumb :breadcrumbs="breadcrumbs"></hy-breadcrumb>
			</div>
			<user-info></user-info>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineEmits } from 'vue'
	import userInfo from '@/components/nav-header/src/userInfo.vue'
	import HyBreadcrumb from '@/base-ui/breadcrumb/index'

	import { getMenu } from './hooks/breadcrumb'

	// 定义属性
	const isFold = ref<boolean>(false)

	// 面包屑的数据: [{name: , path: }]
	const breadcrumbs = getMenu()
	// 声明
	const emit = defineEmits<{
		(e: 'foldChange', ifFold: boolean): void
	}>()

	// 定义方法
	const handleFoldClick = () => {
		isFold.value = !isFold.value
		emit('foldChange', isFold.value)
	}
</script>

<style scoped lang='less'>
	.nav-header {
		display: flex;
		width: 100%;
		.fold-menu {
			font-size: 30px;
			cursor: pointer;
			display: flex;
			align-items: center;
			color: #fff;
		}

		.content {
			display: flex;
			justify-content: space-between;
			flex: 1;
			padding: 0 20px;
			.breadcrumb {
				display: flex;
				align-items: center;
			}
		}
	}
</style>
