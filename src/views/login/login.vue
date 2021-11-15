<template>
	<div id="login">
		<login-panel></login-panel>
	</div>
</template>

<script setup lang="ts">
	import loginPanel from '@/views/login/cpns/login-panel.vue'
</script>

<style scoped >
	#login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: url('../../assets/img/login-bg.jpg');
		background-size: cover;
	}
</style>
