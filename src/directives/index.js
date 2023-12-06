//定义懒加载插件
import { useIntersectionObserver } from "@vueuse/core";

//此处export const lazyPlugin是按需导出.
//这种格式是按需导出,则导入时需要使用{}进行解构导入

export const lazyPlugin = {
	//这个install是插件对象的固定方法.use的注册入口
	install(app) {
		//懒加载指令逻辑

		app.directive("img-lazy", {
			//定义全局指令,第一个参数是指令的name,第二个是指令的配置对象
			//指令的生命周期,在指令绑定到元素上时触发
			mounted(el, binding) {
				//el是指令绑定的元素,img,
				//binding:binging.value 指令等于号: = 后面绑定的表达式的值.
				const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
					if (isIntersecting) {
						// console.log("图片进入视口");
						el.src = binding.value; //如果图片进入视口,则将图片的src属性设置为绑定的值
						stop(); //停止监听元素
					}
				});
			},
		});
	},
};
