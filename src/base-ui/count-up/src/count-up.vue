<template>
	<span class="count-up" ref="counterRef"></span>
</template>

<script lang="ts" setup>
	import { defineProps, watch, onMounted, withDefaults } from 'vue'
	import { useCountUp } from '../hooks/useCountUp'

	const props = withDefaults(
		defineProps<{
			number: number
			option?: any
		}>(),
		{
			number: 0
		}
	)

	watch(
		() => props.number,
		() => {
			update(props.number)
		}
	)
	onMounted(() => {
		createCounter(props.number, props.option)
	})

	const { counterRef, createCounter, update } = useCountUp()
</script>

<style scoped lang="less"></style>
