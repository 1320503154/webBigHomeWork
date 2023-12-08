import { createApp } from "vue";
import { createPinia } from "pinia";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //引入pinia持久化插件
import { lazyPlugin } from "@/directives/index.js"; // 引入懒加载插件
import { componentPlugin } from "@/components/index.js"; // 引入组件注册插件
import "./css/iconfont.css";
import Particles from "particles.vue3";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate); //使用pinia持久化插件

app.use(pinia);
app.use(router);
app.use(lazyPlugin); //使用懒加载插件
app.use(componentPlugin); //全局注册的组件
app.use(Particles); //粒子特效

app.mount("#app");
