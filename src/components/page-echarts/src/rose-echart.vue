<template>
	<div class="rose-echart">
		<base-echart :options="option"></base-echart>
	</div>
</template>

<script lang="ts" setup>
	import BaseEchart from '@/base-ui/echart'
	import { defineProps, computed } from 'vue'
	import { EChartsOption } from 'echarts'
	import { IDataType } from '../type'

	const props = defineProps<{
		roseData: IDataType[]
	}>()

	const option = computed<EChartsOption>(() => ({
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		series: [
			{
				name: '分类数据',
				type: 'pie',
				radius: [10, 100],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 5
				},
				data: props.roseData
			}
		]
	}))
</script>

<style lang="less" scoped>
</style>
