<template>
	<div class="hy-form">
		<div class="header">
			<slot name="header"></slot>
		</div>
		<el-form :label-width="props.labelWidth">
			<el-row>
				<el-col
					v-bind="props.colLayout"
					v-for="item in props.formItems"
					:key="item.label"
				>
					<el-form-item
						:label="item.label"
						:style="props.itemStyle"
						v-if="!item.isHidden"
					>
						<!-- 输入框或者密码框 -->
						<template v-if="item.type === 'input' || item.type == 'password'">
							<el-input
								:placeholder="item.placeHolder"
								:show-password="item.type === 'password'"
								v-model="formData[`${item.field}`]"
							></el-input>
						</template>
						<!-- 选择下拉框 -->
						<template v-if="item.type === 'select'">
							<el-select
								:placeholder="item.placeHolder"
								style="width: 100%"
								v-model="formData[`${item.field}`]"
							>
								<el-option
									v-for="option in item.options"
									:key="option.value"
									:value="option.value"
								>
									{{ option.title }}
								</el-option>
							</el-select>
						</template>
						<!-- 选择日期 -->
						<template v-if="item.type === 'datepicker'">
							<el-date-picker
								style="width: 100%"
								v-model="formData[`${item.field}`]"
								v-bind="item.otherOption"
							>
							</el-date-picker>
						</template>
						<!--  -->
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, withDefaults, ref, defineEmits, watch } from 'vue'
	// 接受参数的类型
	type IForType = 'input' | 'password' | 'select' | 'datepicker'
	interface IFormItem {
		field: string
		type: IForType
		label: string
		rules?: any[]
		placeHolder?: string
		options?: any[]
		otherOption?: any
		isHidden?: boolean
	}

	interface IForm {
		formItems: IFormItem[]
		itemStyle?: any
		colLayout?: any
		labelWidth?: string
		modelValue?: any
	}

	// 接受默认的参数
	const props = withDefaults(defineProps<IForm>(), {
		formItems: () => [],
		labelWidth: '100px',
		itemStyle: () => ({
			padding: '10px 40px'
		}),
		colLayout: () => ({
			xl: 12, //>1920 4个
			lg: 12, //>1200 3个
			md: 12, // >992 2个
			sm: 24, // >7678 1个
			xs: 24 //<768 1个
		}),
		modelValue: () => ({})
	})
	// 发出的事件
	const emits = defineEmits<{
		(e: 'update:modelValue', value: any): void
	}>()

	// 使得formData中的数据为自己组件的数据
	const formData = ref({ ...props.modelValue })

	watch(
		formData,
		(newValue) => {
			emits('update:modelValue', newValue)
		},
		{
			deep: true
		}
	)
</script>

<style scoped>
	.hy-form {
		padding-top: 22px;
	}
</style>

