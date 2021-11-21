<template>
	<div class="descriptions">
		<el-descriptions class="margin-top" :title="title" :column="column" border>
			<template v-for="(itemData, index) in tableDatas" :key="index">
				<el-descriptions-item :label="itemData.name">
					<el-tag size="small">{{ itemData.description }}</el-tag>
				</el-descriptions-item>
			</template>
		</el-descriptions>
	</div>
</template>

<script lang="ts" setup>
	import { defineProps, withDefaults } from 'vue'
	import { IDescriptionProp } from '../types'
	withDefaults(
		defineProps<{
			title?: string
			column: number
			tableDatas: Array<IDescriptionProp>
		}>(),
		{
			title: '',
			column: 1,
			tableDatas: () => []
		}
	)
</script>


<style lang="less" scoped>
	.descriptions {
		margin-bottom: 20px;
	}
</style>
