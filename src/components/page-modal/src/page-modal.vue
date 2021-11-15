<template>
	<div class="page-modal">
		<el-dialog
			v-model="dialogVisible"
			title="新建用户"
			width="30%"
			center
			destroy-on-close
		>
			<hy-form v-bind="props.modalConfig" v-model="formData"></hy-form>
			<slot></slot>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleConfigClick">确认</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
	import { ref, defineProps, withDefaults, defineExpose, watch } from 'vue'
	import hyForm from '@/base-ui/form'
	import { useStore } from '@/store'
	// 收到对应的参数配置
	const props = withDefaults(
		defineProps<{
			modalConfig: any
			defaultInfo: any
			pageName: string
			otherInfo?: any
		}>(),
		{
			modalConfig: () => ({}),
			defaultInfo: () => ({}),
			otherInfo: () => ({}),
			pageName: ''
		}
	)

	const dialogVisible = ref(false)
	const formData = ref<any>({})
	watch(
		() => props.defaultInfo,
		(newValue) => {
			for (const item of props.modalConfig.formItems) {
				formData.value[item.field] = newValue[item.field]
			}
		}
	)

	const store = useStore()
	// 确定按钮的点击
	const handleConfigClick = () => {
		dialogVisible.value = false
		if (Object.keys(props.defaultInfo).length) {
			// 编辑
			store.dispatch(`system/editPageDataAction`, {
				pageName: props.pageName,
				editData: { ...formData.value, ...props.otherInfo },
				id: props.defaultInfo.id
			})
		} else {
			// 创建
			store.dispatch(`system/createPageDataAction`, {
				pageName: props.pageName,
				newData: { ...formData.value, ...props.otherInfo }
			})
		}
	}
	// 暴露属性
	defineExpose({
		dialogVisible
	})
</script>

<style scoped lang="less"></style>
