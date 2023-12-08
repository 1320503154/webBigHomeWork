<template>
	<div>
		<div>
			<h1>404 - Not Found</h1>
			<p>
				你当前访问的页面路径是<span style="color: tomato"
					>/{{ route.params.catchAll }}</span
				>
			</p>
			<p>抱歉，页面未找到。</p>
			<el-button
				type="primary"
				size="large"
				@click="$router.push('/')"
				>返回主页</el-button
			>
		</div>
	</div>
</template>

<script setup>
	import { useRoute } from "vue-router";

	const route = useRoute();
	console.log(route);
</script>

<style scoped>
	h1 {
		font-size: 64px;
	}
	div {
		text-align: center;
		padding: 100px 0;
	}
	p {
		font-size: 20px;
	}
	.el-button {
		font-style: 20px;
	}
</style>
