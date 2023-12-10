import { useIntersectionObserver } from "@vueuse/core";

//此处export const lazyPlugin是按需导出.
//这种格式是按需导出,则导入时需要使用{}进行解构导入

export const lazyPlugin = {
	install(app) {
		app.directive("img-lazy", {
			mounted(el, binding) {
				const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
					if (isIntersecting) {
						el.src = binding.value; //如果图片进入视口,则将图片的src属性设置为绑定的值
						stop(); //停止监听元素
					}
				});
			},
		});
	},
};
