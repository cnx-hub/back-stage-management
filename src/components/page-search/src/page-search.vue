<template>
	<div>
		<hy-form v-bind="props.searchFormConfig" v-model="formData">
			<template #header>
				<!-- <h2 class="header">高级检索</h2> -->
			</template>
			<template #footer>
				<div class="footer">
					<el-button type="primary" @click="handleResetClick">
						<el-icon><refresh /></el-icon>重置
					</el-button>
					<el-button type="primary" @click="handleQueryClick">
						<el-icon><search /></el-icon>搜索
					</el-button>
				</div>
			</template>
		</hy-form>
	</div>
</template>

<script lang="ts" setup>
	import { ref, defineProps, withDefaults, defineEmits } from 'vue'
	import hyForm from '@/base-ui/form'
	import { Refresh, Search } from '@element-plus/icons'

	const props = withDefaults(defineProps<{ searchFormConfig: any }>(), {
		searchFormConfig: () => ({})
	})

	// 双向绑定的属性应该是由配置文件来决定的
	const formItems = props.searchFormConfig?.formItems ?? []
	let formOriginData: any = {}
	for (const item of formItems) {
		formOriginData[item.field] = ''
	}
	const formData = ref(formOriginData)

	const emits = defineEmits<{
		(e: 'resetBtnClick'): void
		(e: 'queryBtnClick', formData: any): void
	}>()
	// 重置按钮
	const handleResetClick = () => {
		for (const key in formOriginData) {
			formData.value[key] = formOriginData[key]
		}
		emits('resetBtnClick')
	}

	// 搜索按钮
	const handleQueryClick = () => {
		emits('queryBtnClick', formData.value)
	}
</script>


<style scoped>
	.footer {
		text-align: right;
		padding: 0 20px 20px 0;
	}
</style>
