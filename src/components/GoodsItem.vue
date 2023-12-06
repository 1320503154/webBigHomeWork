<script setup>
	import { computed, defineProps } from "vue";

	import { useCartStore } from "@/stores/cartStore";
	import { useUserStore } from "@/stores/user";

	const cartStore = useCartStore();
	const userStore = useUserStore();

	const apiUrl = "http://10.60.82.146:8080";
	const props = defineProps({
		goods: {
			type: Object,
			default: () => {},
		},
	});

	const imgUrl = computed(() => {
		return `${apiUrl}/${props.goods.pthumbnail}`;
	});

	const num = ref(1);
	const handleChange = (value) => {
		console.log(value);
	};
	const addToCart = async (good) => {
		console.log("userStore.userInfo::: ", userStore.userInfo);
		console.log(good);
		console.log("商品id:" + good.id);
		const result = await cartStore.addCart(good, num.value);
		console.log("await cartStore.addCart(good, num);::: ", cartStore.cartList);
	};
</script>

<template>
	<div class="goods-item">
		<img
			v-img-lazy="imgUrl"
			alt="" />
		<p class="name ellipsis">{{ props.goods.name }}</p>
		<p class="price">&yen;{{ props.goods.price1 }}</p>
		<div class="addToCart">
			<el-input-number
				v-model="num"
				:min="1"
				:max="10"
				@change="handleChange" />
			<el-button
				type="primary"
				@click="addToCart(props.goods)"
				>添加商品到购物车</el-button
			>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.goods-item {
		display: block;
		width: 220px;
		padding: 20px 30px;
		text-align: center;
		transition: all 0.5s;
		cursor: pointer;
		background-color: white;

		&:hover {
			transform: translate3d(0, -3px, 0);
			box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
			border-radius: 50px;
		}

		img {
			width: 160px;
			height: 160px;
		}

		p {
			padding-top: 10px;
		}

		.name {
			font-size: 16px;
		}

		.desc {
			color: #999;
			height: 29px;
		}

		.price {
			color: #ff6700;
			font-size: 20px;
		}
	}
</style>
