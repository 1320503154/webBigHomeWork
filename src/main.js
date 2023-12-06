import { createApp } from "vue";
import { createPinia } from "pinia";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //引入pinia持久化插件
import { lazyPlugin } from "@/directives/index.js"; // 引入懒加载插件
import { componentPlugin } from "@/components/index.js"; // 引入组件注册插件
import "./css/iconfont.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(lazyPlugin); //使用懒加载插件
app.use(componentPlugin); //全局注册的组件

app.mount("#app");
