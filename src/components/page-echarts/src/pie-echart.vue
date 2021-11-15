<template>
	<div class="pie-echart">
		<base-echart :options="options"></base-echart>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, computed } from 'vue'
	import { EChartsOption } from 'echarts'
	import BaseEchart from '@/base-ui/echart'
	import { IDataType } from '../type'

	const props = defineProps<{
		pieData: IDataType[]
	}>()

	const options = computed<EChartsOption>(() => {
		return {
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'horizontal',
				left: 'left'
			},
			series: [
				{
					name: '分类数据',
					type: 'pie',
					radius: '50%',
					data: props.pieData,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		}
	})
</script>

<style scoped></style>
