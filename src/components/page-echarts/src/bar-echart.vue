<template >
	<div class="bar-echart">
		<base-echart :options="options"></base-echart>
	</div>
</template>

<script lang="ts" setup>
	import baseEchart from '@/base-ui/echart'
	import { computed, defineProps } from 'vue'
	import * as echarts from 'echarts'

	const props = defineProps<{
		xLabels: string[]
		values: any[]
	}>()

	const options = computed<echarts.EChartsOption>(() => ({
		title: {
			text: '支持鼠标滚动缩放',
			textStyle: {
				// fontStyle: 'normal',
				fontWeight: 400,
				fontSize: 14
			}
		},
		grid: {
			bottom: '5%'
		},
		xAxis: {
			data: props.xLabels,
			axisLabel: {
				inside: true,
				color: '#fff'
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: '#999'
			}
		},
		dataZoom: [
			{
				type: 'inside'
			}
		],
		series: [
			{
				type: 'bar',
				showBackground: true,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#83bff6' },
						{ offset: 0.5, color: '#188df0' },
						{ offset: 1, color: '#188df0' }
					])
				},
				emphasis: {
					itemStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: '#2378f7' },
							{ offset: 0.7, color: '#2378f7' },
							{ offset: 1, color: '#83bff6' }
						])
					}
				},
				data: props.values
			}
		]
	}))
</script>

<style scoped lang="less">
</style>
