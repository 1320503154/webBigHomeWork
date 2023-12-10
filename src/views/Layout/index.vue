<template>
	<div>
		<el-backtop
			:right="100"
			:bottom="100" />
		<Header></Header>
		<!-- 问题来了,为什么不用插槽来管理我的商品展示列表和购物车链表??? -->
		<div class="container">
			<h1 class="showBanner">整体商品概览</h1>
		</div>

		<div class="homeBanner">
			<HomeBanner></HomeBanner>
		</div>

		<div
			v-infinite-scroll="loadMoreGoods"
			:infinite-scroll-disabled="disabled"
			v-if="goodList"
			class="goods-list">
			<GoodsItem
				class="goods-item"
				v-for="goods in goodList"
				:key="goods.id"
				:goods="goods" />
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, reactive, onMounted } from "vue";
	import GoodsItem from "@/components/GoodsItem.vue";
	import HomeBanner from "./components/HomeBanner.vue";
	import Header from "./components/Header.vue";
	import HeaderCart from "./components/HeaderCart.vue";
	import { useUserStore } from "@/stores/user";
	import { useGoodStore } from "@/stores/goodStore";
	import { useRoute } from "vue-router";

	const userStore = useUserStore();
	const goodStore = useGoodStore();
	const route = useRoute();
	const disabled = computed(() => {
		return goodList.value.length > 80; //当商品数量大于80的时候disable
	});
	const goodList = ref([]);
	let goodLoad = [];
	onMounted(async () => {
		goodList.value = await goodStore.getGoodInfo();
		goodLoad = goodList.value;
		// console.log('goodLoad::: ', goodLoad);
	});
	const loadMoreGoods = () => {
		goodList.value.push(...goodLoad);
	};
	const unwatch = watch(route.path, () => {
		console.log("监听到路由变化route.path::: ", route.path);
		goodList.value = goodStore.goodList;
		goodLoad = goodList.value;
	});
	onUnmounted(() => {
		unwatch();
	});
</script>

<style lang="scss" scoped>
	// 超出部分显示省略号
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

	.goods-list {
		display: flex;
		flex-wrap: wrap;
		//超过三个元素换行
		justify-content: space-between;
		padding: 0 20px;
	}

	.goods-item {
		width: calc(30% - 20px);

		margin-bottom: 20px;
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
		@include center();
	}

	.showBanner {
		text-align: center;
		background-clip: text;
		-webkit-background-clip: text;
		color: rgba(0, 0, 0, 1);
		background: #fff;
		width: 300px;
		@include rounded;
	}

	.homeBanner {
		margin-bottom: 50px;
	}
</style>
