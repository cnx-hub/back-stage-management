<template>
	<div class="chat">
		<nx-editor
			v-model:value="htmlString"
			@handleClick="handldClick"
			v-model:title="titleString"
		></nx-editor>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { useStore } from '@/store'
	import NxEditor from '@/base-ui/editor'

	const htmlString = ref<string>('coderwhy')
	const titleString = ref<string>('')
	const store = useStore()
	const handldClick = () => {
		store.dispatch('system/createPageDataAction', {
			pageName: 'story',
			newData: {
				title: titleString.value,
				content: htmlString.value
			}
		})
	}
</script>

<style scoped></style>
