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
			ElMessage({
				type: "warning",
				message: `请求失败-错误信息是:${ErrorData.error}`,
			});
		}
		return Promise.reject(error);
	}
);
export default shopping;
