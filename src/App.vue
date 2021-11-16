<template>
	<div id="app">
		<el-config-provider :locale="zhCn">
			<router-view></router-view>
		</el-config-provider>
	</div>
</template>

<script setup lang="ts">
	import { ElConfigProvider } from 'element-plus'
	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style scoped>
	#app {
		width: 100%;
		height: 100%;
	}
</style>

