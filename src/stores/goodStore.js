import { ref, reactive, computed } from "vue";
import { userLogin, userRegister } from "@/apis/user";
import { getGoodList } from "@/apis/goods";
import { defineStore } from "pinia"; //不引入这个函数,在vue的调试工具中将不会显示pinia调试工具
export const useGoodStore = defineStore(
	"goods",
	() => {
		const goodList = ref([]);

		const getGoodInfo = async () => {
			const result = await getGoodList();
			goodList.value = result;
			return result;
		};

		return {
			getGoodInfo,
			goodList,
		};
	},
	{
		persist: true, // 这里的 persist 应该在 defineStore 的第二个参数中
	}
);
