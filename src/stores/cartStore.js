// 封装购物车模块
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, getNewCartListAPI, delCartAPI } from "@/apis/carts";

export const useCartStore = defineStore(
	"cart",
	() => {
		const userStore = useUserStore();
		const isLogin = userStore.isLogin;
		let userId = userStore.userInfo;
		const cartList = ref([]); // 购物车列表

		// 获取购物车信息
		const huoQuGouWuChe = function (userId) {
			getNewCartListAPI({ userId })
				.then((res) => {
					cartList.value = res;
					console.log("cartList.value::: ", cartList.value);
				})
				.catch((err) => {
					console.error(err); // 使用catch而不是reject
				});
		};

		// 添加商品到购物车
		const addCart = async (goods, num) => {
			if (isLogin) {
				console.log("登录接口调用添加购物车");

				const { id: goodsId, price1: price } = goods;
				cartList.value = await insertCartAPI({ userId, goodsId, num, price });
				console.log("cartList.value::: ", cartList.value);
			} else {
				// 用户未登录
				ElMessage({
					message: "未登录,无法添加商品",
					type: "warning",
				});
			}
		};

		// 从购物车删除商品
		const delCart = async (goods) => {
			if (isLogin) {
				console.log("登录接口调用删除购物车");
				const { id: cartId, price1: price } = goods;
				cartList.value = await delCartAPI({ userId, cartId });
			} else {
				// 用户未登录
				ElMessage({
					message: "未登录,无法删除商品",
					type: "warning",
				});
			}
		};

		// 单个商品选中状态切换
		const singleCheck = (goodsId, selected) => {
			const item = cartList.value.find((item) => goodsId === item.goodsId);
			// item是引用类型,装的是原本对象里面的根据find条件匹配好的指针,所以直接修改item.selected的值,会影响到cartList.value中的值
			item.selected = selected;
		};

		// 全选商品
		const allCheck = (selected) => {
			cartList.value.forEach((item) => {
				item.selected = selected;
			});
		};

		// 计算属性

		// 全选
		const isAllCheck = computed(() => {
			return cartList.value.every((item) => item.selected);
			// 当数组内元素都是true时,返回true,则全选,否则返回false
		});

		// 选中的商品数量
		const selectedCount = computed(() => {
			return cartList.value
				.filter((item) => item.selected) // 过滤出选中的商品,返回数组
				.reduce((pre, item) => pre + item.num, 0); // 累加数组内的商品数量
		});

		// 选中的商品总价
		const selectedPrice = computed(() => {
			return cartList.value
				.filter((item) => item.selected)
				.reduce((pre, item) => pre + item.num * item.price, 0); // 累加数组内的商品数量*单价
		});

		// 商品总数
		const totalCount = computed(() => {
			let sum = 0;
			cartList.value.forEach((item) => {
				sum += item.num;
			});
			return sum;
		});

		// 商品总价
		const totalPrice = computed(() => {
			return cartList.value.reduce((total, item) => {
				return total + item.num * item.price;
			}, 0); // 设置初始值为0,也就是第一次迭代时,total=0,然后item从index=0处开始
		});

		return {
			huoQuGouWuChe,
			addCart,
			delCart,
			cartList,
			isAllCheck,
			selectedCount,
			selectedPrice,
			totalCount,
			totalPrice,
			singleCheck,
			allCheck,
		};
	},
	{
		persist: true, // 开启持久化
	}
);
