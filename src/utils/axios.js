//axios基础封装
import axios from "axios";
//引入消息提示组件
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

import router from "@/router/index";

// import { useUserStore } from "@/stores/user";
// const userStore = useUserStore();

const shopping = axios.create({
	baseURL: "http://localhost:5173/api",
	timeout: 5000, // 请求超时时间
});

// axios请求拦截器
shopping.interceptors.request.use(
	(config) => {
		//1.从pinia获取token

		// const token = userStore.userInfo.token;
		//2.按照后端要求设置请求头
		// const headers = config.headers;
		// if (token) {
		// 	headers.Authorization = `Bearer ${token}`;
		// }
		return config;
	},
	(error) => Promise.reject(error)
);
//axios响应拦截器
shopping.interceptors.response.use(
	(response) => {
		return response.data; //对axios的响应对象进行解包
	},
	(error) => {
		Promise.reject(error);
		if (error) {
			const { status } = error.response;
			const ErrorData = error.response.data;
			//统一错误提示
			ElMessage({
				type: "warning",
				message: ErrorData.message,
			});
			// //token失效状态码401拦截
			// if (status === 401) {
			// 	//清除用户信息
			// 	userStore.clearUserInfo();
			// 	//跳转到登录页
			// 	router.push("/login");
			// }
		}
		return Promise.reject(error);
	}
);
export default shopping;
