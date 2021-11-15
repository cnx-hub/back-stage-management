<template>
	<div id="login-account">
		<el-form label-width="70px" :rules="rules" :model="account" ref="formRef">
			<el-form-item label="账号" prop="name">
				<el-input
					v-model="account.name"
					:input-style="{ borderRadius: '25px' }"
				/>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input
					v-model="account.password"
					show-password
					:input-style="{ borderRadius: '25px' }"
				/>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
	import { reactive, defineExpose, ref } from 'vue'
	import { ElForm } from 'element-plus'
	import { useStore } from 'vuex'

	import { rules } from '../config/account-config.ts'
	import cache from '@/utils/cache'
	// 保存name和password
	const account = reactive({
		name: cache.getCache('name') ?? '',
		password: cache.getCache('password') ?? ''
	})
	// 路由对象
	const store = useStore()

	const formRef = ref<InstanceType<typeof ElForm>>()

	const loginAction = (isKeepPassword: boolean) => {
		formRef.value?.validate((isPass) => {
			if (isPass) {
				// 是否保存密码
				if (isKeepPassword) {
					cache.setCache('name', account.name)
					cache.setCache('password', account.password)
				} else {
					cache.deleteCache('name')
					cache.deleteCache('password')
				}
				store.dispatch('login/accountLoginAction', { ...account })
			}
		})
	}

	// 导出对应方法/属性
	defineExpose({
		loginAction
	})
</script>

<style scoped lang="less">
	.el-input__inner {
		border-radius: 25px !important;
	}
</style>
