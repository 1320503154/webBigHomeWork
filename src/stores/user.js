//管理用户数据的仓库Pinia
//和用户信息相关的东西都放到pinia里面去维护
//清除用户信息的操作也放到pinia里面,组件只是触发action
import { ref, reactive, computed } from "vue";
import { userLogin, userRegister } from "@/apis/user";
import { defineStore } from "pinia"; //不引入这个函数,在vue的调试工具中
//将不会显示pinia调试工具
export const useUserStore = defineStore(
	"user",
	() => {
		//管理用户数据的state
		const userInfo = ref('');
		//获取用户信息的action
		const getUserInfo = async ({ account, password }) => {
			console.log('Login account, password::: ', account, password);

			const result = await userLogin({ account, password });
			userInfo.value = result;
			return result;
		};
		//清除用户信息
		const clearUserInfo = () => {
			// console.log('clearUserInfo::: ', userInfo.value);
			userInfo.value = false;
		};
		const userSignUp = async ({ account, password }) => {
			console.log('SIgn up account', account);
			console.log('SIgn up password', password);
			const result = await userRegister({ account, password });
			return result;
		};
		const isLogin = computed(() => !!userInfo.value);//!!强制转换字符串为布尔值
		return {
			userInfo, //返回的响应式数据自动解包
			getUserInfo,
			clearUserInfo,
			isLogin,
			userSignUp,
		};
	},
	{
		persist: true, //把pinia始终和localStorage同步
	}
);
