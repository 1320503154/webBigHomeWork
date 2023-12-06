import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "LayOut",
			component: () => import("@/views/Layout/index.vue"), //路由懒加载
		},
		{
			path: "/login",
			name: "Login",
			component: () => import("@/views/Login/index.vue"),
		},
		{
			path: "/Signup",
			name: "Signup",
			component: () => import("@/views/Signup/index.vue"),
		},
		{
			path: "/cart",
			name: "Cart",
			component: () => import("@/views/cartList/index.vue"),
		}
	],
	//路由滚动行为定制,目的是每次切换路由的时候,让页面滚动到顶部
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
});
export default router;
