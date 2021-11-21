<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>{{ title }}</span>
			</div>
		</template>
		<div class="item">
			<slot></slot>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
	import { defineProps } from 'vue'
	defineProps<{
		title: string
	}>()
</script>

<style lang="less" scoped>
	.box-card {
		&:deep(.el-card__header) {
			padding: 10px 20px !important;
		}
	}
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
		font-weight: 700;
	}
	.item {
		margin-bottom: 10px;
		// border: 1px solid red;
	}
</style>
