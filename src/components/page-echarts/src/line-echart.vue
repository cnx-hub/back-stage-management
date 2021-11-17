<template>
	<div class="line-echart">
		<base-echart :options="option"></base-echart>
	</div>
</template>

<script setup lang="ts">
	import baseEchart from '@/base-ui/echart'
	import { computed, defineProps, withDefaults } from 'vue'
	import { EChartsOption } from 'echarts'

	const props = withDefaults(
		defineProps<{
			title?: string
			xLabels: string[]
			values: any
		}>(),
		{
			title: ''
		}
	)

	const option = computed<EChartsOption>(() => ({
		title: {
			text: props.title
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: props.xLabels
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: 'Union Ads',
				type: 'line',
				stack: 'Total',
				smooth: true,
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				data: props.values
			}
		]
	}))
</script>

<style lang="less" scoped>
</style>
