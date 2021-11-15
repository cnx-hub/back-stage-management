<template>
	<div id="login-panel">
		<h1 class="title">后台管理系统</h1>

		<el-tabs type="border-card" stretch v-model="currentTab">
			<el-tab-pane name="account">
				<template #label>
					<span>
						<el-icon><user-filled /></el-icon>账号登录
					</span>
				</template>
				<login-account ref="accountRef" />
			</el-tab-pane>
			<el-tab-pane name="phone">
				<template #label>
					<span>
						<el-icon><iphone /></el-icon>手机登录
					</span>
				</template>
				<login-phone ref="phoneRef" />
			</el-tab-pane>
		</el-tabs>

		<div class="account-control">
			<el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
			<el-link type="primary">忘记密码</el-link>
		</div>

		<div>
			<el-button type="primary" class="login-btn" @click="handleLoginClick"
				>立即登录</el-button
			>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { UserFilled, Iphone } from '@element-plus/icons'
	import loginAccount from '@/views/login/cpns/login-account'
	import loginPhone from '@/views/login/cpns/login-phone'
	// 定义属性
	const isKeepPassword = ref<boolean>(true)
	const currentTab = ref<string>('account')
	const accountRef = ref<InstanceType<typeof loginAccount>>()
	const phoneRef = ref<InstanceType<typeof loginPhone>>()

	// 定义方法
	const handleLoginClick = () => {
		if (currentTab.value === 'account') {
			accountRef.value?.loginAction(isKeepPassword)
		} else {
			phoneRef.value?.loginAction(isKeepPassword)
		}
	}
</script>

<style scoped lang="less">
	#login-panel {
		transform: translateX(-125%);
		width: 320px;
		.title {
			text-align: center;
		}
		.account-control {
			display: flex;
			justify-content: space-between;
		}
		.login-btn {
			width: 100%;
		}
	}
</style>
