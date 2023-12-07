import { createRouter, createWebHistory } from "vue-router";
// 默认导入组件
import LayOut from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Signup from "@/views/Signup/index.vue";
import Cart from "@/views/cartList/index.vue";
import Order from "@/views/orderList/index.vue";
import Pay from "@/views/orderList/pay.vue";

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
		},
		{
			path: "/pay",
			name: "Pay",
			component: Pay,
		},
	],
	// 路由滚动行为定制,目的是每次切换路由的时候,让页面滚动到顶部
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
});

export default router;
