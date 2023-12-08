import { createRouter, createWebHistory } from "vue-router";
// 默认导入组件
import LayOut from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Signup from "@/views/Signup/index.vue";
import Cart from "@/views/cartList/index.vue";
import Order from "@/views/orderList/index.vue";
import Pay from "@/views/orderList/pay.vue";
import NotFound from "@/views/NotFound/index.vue";
import { useCartStore } from "@/stores/cartStore";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "LayOut",
			component: LayOut,
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
		},
		{
			path: "/Signup",
			name: "Signup",
			component: Signup,
		},
		{
			path: "/cart",
			name: "Cart",
			component: Cart,
		},
		{
			path: "/order",
			name: "Order",
			component: Order,
			beforeEnter: (to, from, next) => {
				// 判断上一个页面是购物车还是订单
				if (from.name == "Cart") {
					// 允许跳转到订单页面
					next();
				} else {
					ElMessage({
						message: "请先添加商品到购物车,不能直接访问订单页面",
						type: "warning",
					});
					// 不是从购物车跳转而来，重定向到购物车页面或其他处理方式
					next("/");
				}
			},
		},
		{
			path: "/pay",
			name: "Pay",
			component: Pay,
			beforeEnter: (to, from, next) => {
				if (from.name == "Order") {
					next();
				} else {
					ElMessage({
						message: "不能直接访问付款页面",
						type: "warning",
					});

					next("/");
				}
			},
		},
		{
			path: "/:catchAll(.*)",
			name: "NotFound",
			component: NotFound,
		},
	],
	// 路由滚动行为定制,目的是每次切换路由的时候,让页面滚动到顶部
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
});

export default router;
