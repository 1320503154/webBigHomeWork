//把components中的所有组件进行全局化注册
//通过插件的方式

import { ElMessage } from "element-plus";
import HeaderVue from "./Header.vue";
import "element-plus/theme-chalk/el-message.css";

export const componentPlugin = {
	install(app) {
		app.component(ElMessage, ElMessage); //全局注册消息提示组件
		app.component("HeaderVue", HeaderVue); //全局注册头部组件
	},
};
