<template>
	<div class="breadcrumb">
		<el-breadcrumb class="breadcrumb">
			<template v-for="item in props.breadcrumbs" :key="item.name">
				<el-breadcrumb-item :to="{ path: item.path }">{{
					item.name
				}}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script lang="ts" setup>
	interface IBreadcrumb {
		name: string
		path?: string
	}
	import { defineProps, withDefaults } from 'vue'
	const props = withDefaults(defineProps<{ breadcrumbs: IBreadcrumb[] }>(), {
		breadcrumbs: () => []
	})
</script>

<style scoped lang="less">
	&:deep(.el-breadcrumb__inner) {
		color: #fff !important;
	}
	&:deep(.el-breadcrumb__separator) {
		color: #fff !important;
	}
</style>
