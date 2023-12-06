<script setup>
	import { useGoodStore } from "@/stores/goodStore";
	import { onMounted, ref } from "vue";
	const bannerList = ref([]);
	const goodStore = useGoodStore();

	onMounted(async () => {
		bannerList.value = await goodStore.getGoodInfo();
		// console.log('bannerList.value::: ', bannerList.value);
	});
	const apiUrl = "http://10.60.82.146:8080";
</script>

<template>
	<div class="home-banner">
		<el-carousel
			indicator-position="outside"
			height="500px">
			<el-carousel-item
				v-for="item in bannerList"
				:key="item.id">
				<div class="container">
					<h1>{{ item.name }}</h1>
					<img
						:src="`${apiUrl}/${item.pthumbnail}`"
						@click="console.log(item)"
						alt="" />
				</div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<style scoped lang="scss">
	.home-banner {
		margin: 0 auto;
		background: url("@/assets/images/cool-bg.png") no-repeat center / cover;
		width: 1240px;
		height: 500px;
		// position: absolute; //绝对定位
		left: 0; //此处主要还是Banner轮播图和左侧的分类组件是一个父元素,container
		top: 0; //所以距离左侧和上侧0,就可以了
		z-index: 98;

		img {
			width: 30%;
			height: 400px;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
