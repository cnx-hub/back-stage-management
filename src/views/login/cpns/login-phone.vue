<template>
	<div>
		<el-form label-width="70px" :rules="rules" :model="phone" ref="formRef">
			<el-form-item label="手机号" prop="num">
				<el-input v-model="phone.num" :input-style="{ borderRadius: '25px' }" />
			</el-form-item>
			<el-form-item label="验证码" prop="code">
				<div class="gain-code">
					<el-input
						v-model="phone.code"
						:input-style="{ borderRadius: '25px' }"
					/>
					<el-button type="primary" class="get-btn">获取验证码</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
	import { reactive, defineExpose, ref } from 'vue'
	import { ElForm } from 'element-plus'
	import { useStore } from 'vuex'

	import cache from '@/utils/cache'
	import { rules } from '../config/account-config.ts'
	//定义属性
	const phone = reactive({
		num: cache.getCache('num') ?? '',
		code: ''
	})
	const store = useStore()
	const formRef = ref<InstanceType<typeof ElForm>>()
	// 定义方法
	const loginAction = (isKeepPassword: boolean) => {
		formRef.value?.validate((isPass) => {
			if (isPass) {
				if (isKeepPassword) {
					cache.setCache('num', phone.num)
				} else {
					cache.deleteCache('num')
				}
			}
			store.dispatch('login/accountLoginAction', { ...phone })
		})
	}

	// 暴露属性/方法
	defineExpose({
		loginAction
	})
</script>

<style scoped land="less">
	.gain-code {
		display: flex;
	}
	.get-btn {
		margin-left: 8px;
	}
</style>
