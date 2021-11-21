<template>
	<div class="dashboard">
		<!-- 1.顶部统计数据 -->
		<el-row :gutter="10">
			<template v-for="(item, index) in topPanelData" :key="item.title">
				<el-col :md="12" :lg="6" :xl="6">
					<statistical-panel
						:panelData="item"
						:index="index"
					></statistical-panel>
				</el-col>
			</template>
		</el-row>
		<!-- 2.中间图标 -->
		<el-row :gutter="10">
			<el-col :span="7">
				<nx-card title="分类商品数量(饼图)">
					<pie-echart :pieData="categoryGoodsCount"></pie-echart>
				</nx-card>
			</el-col>
			<el-col :span="10">
				<nx-card title="不同城市商品销量">
					<map-echart :mapData="addressGoodsSale"></map-echart>
				</nx-card>
			</el-col>
			<el-col :span="7">
				<nx-card title="分类商品数量(玫瑰图)">
					<rose-echart :roseData="categoryGoodsCount"></rose-echart>
				</nx-card>
			</el-col>
		</el-row>
		<el-row :gutter="10" class="content-row">
			<el-col :span="12">
				<nx-card title="分类商品的销量">
					<line-echart v-bind="categoryGoodsSale"></line-echart>
				</nx-card>
			</el-col>
			<el-col :span="12">
				<nx-card title="分类商品的收藏">
					<bar-echart v-bind="categoryGoodsFavor"></bar-echart>
				</nx-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue'
	import { useStore } from '@/store'
	import nxCard from '@/base-ui/card'
	import {
		pieEchart,
		roseEchart,
		lineEchart,
		barEchart,
		mapEchart
	} from '@/components/page-echarts'
	import statisticalPanel from '@/components/statistical-panel'
	// 1.请求数据
	const store = useStore()
	store.dispatch('analysis/getDashboardDataAction')
	// 2.获取顶部PanelData
	const topPanelData = computed(() => store.state.analysis.topPanelDatas)
	// 3.获取图表数据
	const categoryGoodsCount = computed(() =>
		store.state.analysis.categoryGoodsCount.map((item) => ({
			name: item.name,
			value: item.goodsCount
		}))
	)

	const categoryGoodsSale = computed(() => {
		const xLabels: string[] = []
		const values: any[] = []
		const categoryGoodsSale = store.state.analysis.categoryGoodsSale
		for (const item of categoryGoodsSale) {
			xLabels.push(item.name)
			values.push(item.goodsCount)
		}
		return { xLabels, values }
	})

	const categoryGoodsFavor = computed(() => {
		const xLabels: string[] = []
		const values: any[] = []
		const categoryGoodsFavor = store.state.analysis.categoryGoodsFavor
		for (const item of categoryGoodsFavor) {
			xLabels.push(item.name)
			values.push(item.goodsFavor)
		}
		return { xLabels, values }
	})

	const addressGoodsSale = computed(() => {
		return store.state.analysis.addressGoodsSale.map((item) => ({
			name: item.address,
			value: item.count
		}))
	})
</script>

<style scoped lang="less">
	.dashboard {
		background-color: #f5f5f5;

		.content-row {
			margin-top: 20px;
		}
	}
</style>
