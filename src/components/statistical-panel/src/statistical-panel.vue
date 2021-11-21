<template>
	<div
		class="statistical"
		:class="{ style1: index == 1, style2: index == 2, style3: index == 3 }"
	>
		<div class="main">
			<span class="title">{{ panelData.subtitle }} </span>&nbsp;
			<count-up
				:number="panelData.number2"
				:option="
					panelData.amount === 'saleroom' ? counterOption2 : counterOption1
				"
			></count-up>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { defineProps } from 'vue'
	import type { IpanelData } from '../type'

	import countUp from '@/base-ui/count-up'

	defineProps<{
		panelData: IpanelData
		index: number
	}>()

	const counterOption1 = {
		decimalPlaces: 0, // 保留两位
		prefix: '' // 单位
	}
	const counterOption2 = {
		decimalPlaces: 0, // 保留两位
		prefix: '￥' // 单位
	}
</script>

<style scoped lang="less">
	.statistical {
		background: url(../../../assets/img/1.png) no-repeat !important;
		background-size: cover !important;
		display: flex;
		padding: 0 20px;
		background: white;
		flex-direction: column;
		justify-content: flex-start;
		box-shadow: 0 2px 12px 0 rgb(0 0 0, 0.1);

		height: 130px;
		margin-bottom: 20px;
		overflow: hidden;
		text-align: left;

		.main {
			display: flex;
			height: 100%;
			font-size: 25px;
			letter-spacing: 1px;
			color: #fdfefd;
			border-top: 1px solid #f0f0f0;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			.title {
				font-size: 14px;
			}
		}
	}
	.style1 {
		background: url(../../../assets/img/2.png) no-repeat !important;
		background-size: cover !important;
	}
	.style2 {
		background: url(../../../assets/img/3.png) no-repeat !important;
		background-size: cover !important;
	}
	.style3 {
		background: url(../../../assets/img/4.png) no-repeat !important;
		background-size: cover !important;
	}
</style>
