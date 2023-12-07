<template>
	<div>
		<el-affix :offset="0">
			<div>
				<div
					class="nav_bg"
					v-if="!userStore.isLogin">
					<el-button
						type="success"
						@click="$router.push('Login')"
						>点我去登录</el-button
					>
					<div class="container">
						<h1 class="helloText">{{ prop.helloText }}</h1>
						<el-button
							type="success"
							@click="$router.go(-1)"
							>返回上一级</el-button
						>
					</div>

					<el-button
						@click="$router.push('Signup')"
						type="primary"
						>点我去注册</el-button
					>
				</div>
				<div
					class="nav_bg"
					v-else="userStore.isLogin">
					<el-button
						v-if="!($route.path === '/cart')"
						type="primary"
						@click="$router.push('cart')"
						>点我去购物车</el-button
					>
					<el-button
						v-else
						type="primary"
						@click="$router.push('/')"
						>切换到主页</el-button
					>
					<div class="container">
						<h1 class="helloText">{{ prop.helloText }}</h1>
						<el-button
							type="success"
							@click="$router.go(-1)"
							>返回上一级</el-button
						>
					</div>
					<el-button
						type="danger"
						@click="userStore.clearUserInfo"
						>点我退出登录</el-button
					>
				</div>
			</div>
		</el-affix>
	</div>
</template>

<script setup>
	import { useUserStore } from "@/stores/user";
	const userStore = useUserStore();
	const prop = defineProps({
		helloText: {
			type: String,
			default: "商品展示列表",
		},
	});

	const route = useRoute();
	console.log("route::: ", route);
</script>
<style lang="scss" scoped>
	@mixin ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@mixin center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@mixin bgImg($url) {
		background: url($url) no-repeat center / cover;
	}

	@mixin rounded {
		border-radius: 20px;
	}

	.nav_bg {
		margin-left: 10%;
		width: 80vw;
		padding: 10px 0;
		height: 100px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		@include rounded;
	}

	.helloText {
		text-align: center;
		background-clip: text;
		-webkit-background-clip: text;
		color: rgba(0, 0, 0, 1);
		background: #fff;
		@include rounded;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
