<template>
	<div class="overview">
		<card title="关于">
			<div class="c-left">
				Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
				、TypeScript、Echart5 等后台系统解决方案。
			</div>
		</card>
		<card title="技术栈">
			<text-link :textArrs="technologyStacks"></text-link>
			<descriptions
				title="生产环境依赖"
				:column="2"
				:tableDatas="dependencies"
			></descriptions>
			<descriptions
				title="开发环境依赖"
				:column="2"
				:tableDatas="devDependencies"
			></descriptions>
		</card>
		<card title="项目结构">
			<div class="c-left">
				<nx-code language="bash" :code="projectDir" />
			</div>
		</card>

		<card title="项目规范">
			<descriptions
				title="文件命名规范"
				:column="1"
				:tableDatas="fileDesignation"
			></descriptions>
			<descriptions
				title="编写组件规范"
				:column="1"
				:tableDatas="cpsDesignation"
			></descriptions>
		</card>
		<card title="Git提交规范">
			<descriptions :column="1" :tableDatas="gitDesignation"></descriptions>
		</card>
	</div>
</template>

<script lang="ts" setup>
	import card from '@/base-ui/card'
	import textLink from '@/base-ui/text-link'
	import Descriptions from '@/base-ui/descriptions'
	import NxCode from '@/base-ui/code'
	import {
		technologyStacks,
		dependencies,
		devDependencies,
		fileDesignation,
		cpsDesignation,
		gitDesignation,
		projectDir
	} from './config'
</script>

<style scoped lang="less">
	.overview {
		.c-left {
			text-align: left;
		}
		.el-card {
			margin-bottom: 20px;
			// ::v-deep 重写 element-plus 样式
			&:deep(.el-card__header span) {
				// ::v-deep .el-card__header span {
				font-weight: 700;
			}
		}
		.description {
			// ::v-deep 重写 element-plus 样式
			&:deep(.el-descriptions__title) {
				// ::v-deep .el-descriptions__title {
				font-weight: 400;
			}
		}
	}
</style>
