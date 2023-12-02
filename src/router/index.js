import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "LayOut",
			component: () => import("@/views/Layout/index.vue"), //路由懒加载

			// children: [
			// 	{
			// 		path: "", //空代表默认渲染此组件
			// 		name: "Home",
			// 		component: () => import("@/views/Home/index.vue"),
			// 	},
			// 	{
			// 		path: "/category/:id", //斜线忘记添加了,麻了
			// 		name: "Category",
			// 		component: () => import("@/views/Category/index.vue"),
			// 	},
			// 	{
			// 		path: "/category/sub/:id",
			// 		name: "SubCategory",
			// 		component: () => import("@/views/SubCategory/index.vue"),
			// 	},
			// 	{
			// 		path: "/detail/:id",
			// 		name: "Detail",
			// 		component: () => import("@/views/Details/index.vue"),
			// 	},
			// 	{
			// 		path: "/cartlist",
			// 		name: "CartList",
			// 		component: () => import("@/views/CartList/index.vue"),
			// 	},
			// ],
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
	],
	//路由滚动行为定制,目的是每次切换路由的时候,让页面滚动到顶部
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
});
export default router;
