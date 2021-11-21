<template>
	<div class="menu">
		<page-content
			:contentTableConfig="contentTableConfig"
			title="新建菜单"
			pageName="menu"
		></page-content>
	</div>
</template>

<script lang="ts" setup>
	import pageContent from '@/components/page-content'
	import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
