<template>
	<div class="nav-menu">
		<div class="logo">
			<img class="img" src="~@/assets/img/logo.png" alt="logo" />
			<span v-if="!props.collapse" class="title">电商后台管理</span>
		</div>
		<el-menu
			class="el-menu-vertical"
			:default-active="defaultValue"
			:collapse="collapse"
			background-color="#324158"
			text-color="#fff"
			active-text-color="#58ceff"
		>
			<template v-for="item in userMenus" :key="item.id">
				<!-- 二级菜单 -->
				<template v-if="item.type === 1">
					<el-sub-menu :index="item.id + ''">
						<template #title>
							<i v-if="item.icon" :class="item.icon"></i>
							<span>{{ item.name }}</span>
						</template>
						<!-- 二级菜单对应的子菜单 -->
						<template v-for="subitem in item.children" :key="subitem.id">
							<el-menu-item
								:index="subitem.id + ''"
								@click="handleMenuItemClick(subitem)"
							>
								<i v-if="subitem.icon" :class="subitem.icon"></i>
								<span>{{ subitem.name }}</span>
							</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
				<!-- 一级菜单 -->
				<template v-else-if="item.type === 2">
					<el-menu-item :index="item.id + ''">
						<i v-if="item.icon" :class="item.icon"></i>
						<span>{{ item.name }}</span>
					</el-menu-item>
				</template>
				<!--  -->
			</template>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
	import { computed, withDefaults, defineProps, ref } from 'vue'
	import { useStore } from '@/store'
	import { useRouter, useRoute } from 'vue-router'
	import { pathMapToMeun } from '@/utils/map-menus'
	// 定义属性
	interface Iprops {
		collapse: boolean
	}
	const props = withDefaults(defineProps<Iprops>(), {
		collapse: false
	})

	const store = useStore()

	const Router = useRouter()
	const Route = useRoute()
	const currentPath = Route.path
	const menu = pathMapToMeun(store.state.login.menu, currentPath)

	let defaultValue = ref(menu.id + '')
	const userMenus = computed(() => store.state.login.menu)

	//定义方法
	const handleMenuItemClick = (item: any) => {
		Router.push({
			path: item.url ?? 'notFount'
		})
	}
</script>

<style scoped lang="less">
	.nav-menu {
		height: 100%;
		background-color: #242f41;
		.logo {
			display: flex;
			height: 28px;
			padding: 12px 10px 8px 10px;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			.img {
				height: 100%;
				margin: 0 10px;
			}
			.title {
				font-size: 16px;
				font-weight: 700;
				color: white;
			}
		}
		.el-menu {
			border-right: none;
		}

		// 目录
		.el-submenu {
			background-color: #001529 !important;
			// 二级菜单 ( 默认背景 )
			.el-submenu-item {
				padding-left: 50px !important;
				background-color: #0c2135 !important;
			}
			::v-deep .el-submenu__title {
				background-color: #001529 !important;
			}
			// hover高亮
			.el-submenu-item:hover {
				color: #fff !important;
			}
			.el-menu-item.is-active {
				color: #fff !important;
				background-color: #0a60bd !important;
			}
		}
		.el-menu-vertical:not(.el-menu--collapse) {
			width: 100%;
			height: calc(100% - 48px);
		}
	}
</style>
