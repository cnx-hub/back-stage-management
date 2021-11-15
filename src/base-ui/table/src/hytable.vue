<template>
	<div class="table">
		<!-- 表格头部 -->
		<div class="header">
			<slot name="header">
				<div class="title">{{ title }}</div>
				<div class="handler">
					<slot name="headerHandler"></slot>
				</div>
			</slot>
		</div>
		<!-- 表格中的主体内容 -->
		<el-table
			:data="props.dataList"
			border
			style="width: 100%"
			@selection-change="handleSelectionChange"
			v-bind="props.childrenProps"
		>
			<!-- 列表主体内容 -->
			<el-table-column
				v-if="showSelectColumn"
				type="selection"
				width="60"
				align="center"
			>
			</el-table-column>
			<el-table-column
				v-if="showIndexColumn"
				type="index"
				label="序号"
				width="80"
				align="center"
			>
			</el-table-column>
			<template v-for="propItem in props.propList" :key="propItem.prop">
				<el-table-column
					v-bind="propItem"
					align="center"
					:show-overflow-tooltip="true"
				>
					<template #default="scope">
						<slot :name="propItem.slotName" :row="scope.row">
							{{ scope.row[propItem.prop] }}
						</slot>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<!-- 表格底部 -->
		<div class="footer" v-if="showFooter">
			<slot name="footer">
				<el-pagination
					:currentPage="props.page.currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="props.page.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="props.dataCount"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				>
				</el-pagination>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, withDefaults, defineEmits } from 'vue'
	const props = withDefaults(
		defineProps<{
			propList: any[]
			showIndexColumn: boolean
			showSelectColumn: boolean
			showFooter?: boolean
			title: string
			childrenProps?: any
			dataList: any[]
			dataCount: number
			page: any
		}>(),
		{
			propList: () => [],
			showIndexColumn: false,
			showSelectColumn: false,
			showFooter: true,
			title: '',
			childrenProps: () => ({}),
			dataList: () => [],
			dataCount: 0,
			page: () => ({ pageSize: 10, currentPage: 0 })
		}
	)

	const emits = defineEmits<{
		(e: 'selectionChange', value: any): void
		(e: 'update:page', pageInfo: any): void
	}>()
	// 定义方法
	const handleSelectionChange = (value: any) => {
		emits('selectionChange', value)
	}
	const handleSizeChange = (pageSize: number) => {
		emits('update:page', { ...props.page, pageSize })
	}
	const handleCurrentChange = (currentPage: number) => {
		emits('update:page', { ...props.page, currentPage })
	}
</script>

<style scoped lang="less">
	.header {
		display: flex;
		justify-content: space-between;
		height: 45px;
		padding: 0 5px;
		align-items: center;
		.title {
			font-size: 20px;
			font-weight: 700;
		}
		.handler {
			align-items: center;
		}
	}
	.footer {
		margin-top: 15px;
		text-align: right;
	}
</style>
