<template>
	<div class="goods">
		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="goods"
			title="新建商品"
		>
			<template #image="scope">
				<el-image
					style="width: 80px; height: 80px"
					:src="scope.row.imgUrl"
					:preview-src-list="[scope.row.imgUrl]"
				></el-image>
			</template>

			<template #oldPrice="scope"> {{ '￥' + scope.row.oldPrice }} </template>
			<template #newPrice="scope"> {{ '￥' + scope.row.newPrice }} </template>
		</page-content>
	</div>
</template>

<script lang="ts" setup>
	import pageContent from '@/components/page-content'

	import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
