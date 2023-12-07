<script setup>
	import { onMounted, ref } from "vue";
	import { RouterLink, RouterView } from "vue-router";
	import { useUserStore } from "@/stores/user";
	import { loadSlim } from "tsparticles-slim";
	const userStore = useUserStore();
	const particlesInit = async (engine) => {
		await loadSlim(engine);
	};
	const options = {
		background: {
			color: {
				value: "#1d2e40", // 背景颜色
			},
		},
		fpsLimit: 120, // 帧率限制
		interactivity: {
			events: {
				onClick: {
					enable: false, // 启用点击事件
					mode: "push", // 模式为推动
				},
				onHover: {
					enable: false, // 启用悬停事件
					mode: "repulse", // 模式为击退
				},
				resize: true, // 启用调整大小事件
			},
			modes: {
				bubble: {
					distance: 400, // 气泡距离
					duration: 2, // 气泡持续时间
					opacity: 0.8, // 气泡透明度
					size: 40, // 气泡大小
				},
				push: {
					quantity: 4, // 推动数量
				},
				repulse: {
					distance: 200, // 击退距离
					duration: 0.4, // 击退持续时间
				},
			},
		},
		particles: {
			color: {
				value: "#87b7ff", // 粒子颜色
			},
			links: {
				color: "#FF00FF", // 连接线颜色
				distance: 150, // 连接线距离
				enable: true, // 启用连接线
				opacity: 0.7, // 连接线透明度
				width: 1, // 连接线宽度
			},
			collisions: {
				enable: false, // 启用碰撞
			},
			move: {
				direction: "none", // 运动方向
				enable: true, // 启用运动
				outModes: {
					default: "bounce", // 超出边界的模式为弹跳
				},
				random: true, // 随机运动
				speed: 5, // 运动速度
				straight: false, // 直线运动
			},
			number: {
				density: {
					enable: true, // 启用粒子密度
					area: 800, // 粒子密度区域
				},
				value: 80, // 粒子数量
			},
			opacity: {
				value: 0.5, // 粒子透明度
			},
			shape: {
				type: "star",
				nb_sides: 5, // 定义五角星
			},
			size: {
				value: { min: 1, max: 5 }, // 粒子大小范围
			},
		},
		detectRetina: true, // 检测视网膜屏幕
	};
</script>
<!-- 
<template>

</template> -->

<template>
	<header></header>

	<RouterView />
	<vue-particles
		id="tsparticles"
		:particlesInit="particlesInit"
		:options="options" />
</template>
<style scoped>
	#tsparticles {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
</style>
