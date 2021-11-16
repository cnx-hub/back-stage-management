<template>
	<div class="chat">
		<nx-editor v-model:value="htmlString"></nx-editor>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import NxEditor from '@/base-ui/editor'

	const htmlString = ref<string>('coderwhy')
</script>

<style scoped></style>
