<template>
	<div class="user-info">
		<el-dropdown>
			<span class="el-dropdown-link">
				<el-avatar
					size="small"
					src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
				></el-avatar>
				<span class="name">{{ name }}</span>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick"
						>退出登录
					</el-dropdown-item>
					<el-dropdown-item divided>
						<el-icon style="vertical-align: middle"><Menu /></el-icon
						>用户信息</el-dropdown-item
					>
					<el-dropdown-item divided>
						<el-icon style="vertical-align: middle"><setting /></el-icon
						>系统管理</el-dropdown-item
					>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useStore } from '@/store'
	import { exitLogin } from './hooks/exitLogin'
	import { Menu, Setting } from '@element-plus/icons'

	// 定义属性
	const store = useStore()
	const name = computed(() => store.state.login.userInfo.name)
	// 退出登录
	const [handleExitClick] = exitLogin()
</script>

<style scoped lang="less">
	.el-dropdown-link {
		cursor: pointer;
		display: flex;
		align-items: center;
		.name {
			color: #fff;
			margin-left: 5px;
		}
	}
</style>
