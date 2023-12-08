<script setup>
	import { ref, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import { orderListAPI } from "@/apis/order";
	import { useUserStore } from "@/stores/user";

	const apiUrl = "http://10.60.82.146:8080";

	const goodIdToImgUrl = {
		"034db61a861345f9bb681b7f283dd1e1":
			"goodsimage/bfd2008fcbfb4cfcafc95983cf57dfec.jpg",
		"04ec26885efc45bd9537711f7db8fabe":
			"goodsimage/1e75a9a69c654af48d4446e0135e92f4.jpg",
		"0866079a93de4f99a83660abf3d41ddd":
			"goodsimage/38229862cf384c2dac4a01b9bf2a4c50.jpg",
		"09099d7e183349669e3596462bd8846d":
			"goodsimage/6b2f511a856d4e40aebb0a58f4f66773.jpg",
		"0ec9fcdc54e94189aa554135617828ce":
			"goodsimage/93f09e04495e4c20adc4b733e9b6ffa3.jpg",
		"174fe448869b45c9890b43f24793ff1d":
			"goodsimage/abbfcb460a874202988f77a8e49fe281.jpg",
		"22395b73210745a9b6c4d5f4d1d5a12a":
			"goodsimage/eef007cb8fde4004a17bd04d6ddef974.jpg",
		"317c22ea2269464a9ff8270e202f9c4d":
			"goodsimage/7acafbfda91948eb89f510ccebb08508.jpg",
		"435347e5e72a4afa89d5b72f7e502d11":
			"goodsimage/d2f2f23e500c40cdb15f24d9f3edeba1.jpg",
		"43bfced6539d49a4963bbb676c002934":
			"goodsimage/30357763a9d54e6b910549d3ff10e148.jpg",
		"46a44ed81d4c4616afd151a05da7cd8b":
			"goodsimage/8768784b052146b39923028cbe8b21a8.jpg",
		"4ec00eb43855403aa81dde1d8a05d538":
			"goodsimage/d26ec22fd43d4d3cb7144276f907ee36.jpg",
		"6953f3fdd7c24254a0b3f36c58cad168":
			"goodsimage/7fb25199a7244b7bb1323c3c66f323a2.jpg",
		b4d486b01f464bde8acf10072917a2d3:
			"goodsimage/75cdb85cfab645eda015c3b6870b1e0f.jpg",
		b7335156b250443284bcc2f33461befd:
			"goodsimage/fdc1486b9c08425a9804aeacc840480a.jpg",
		bcdf6fa2606649498e415fe100cfac0a:
			"goodsimage/0210379971d04bfbb72fffd4c057f5d7.jpg",
		c1aea0f70ba74f1cb6fb117252db8b7c:
			"goodsimage/7332b01a45c8401a9949ff8a0ed191d3.jpg",
		cd9e1d650c7545158eb89ccdd9d61394:
			"goodsimage/9ef94aab96fe4dd2abfc69f0427385be.jpg",
		d375d22a8eab4b7a9ff8982085b297a8:
			"goodsimage/5236001479314e7089015d6dd7d09ab4.jpg",
		d5552aa19b154661a339f8a7ae3c5f26:
			"goodsimage/5275665e56c7423fa997f6810b97979d.jpg",
		d95968ea2f384d37b2953b43718535bb:
			"goodsimage/5b8992df2aa3481a9e458d3fc1c2871b.jpg",
		e082e3c8708c4eef9b30c9ee7b8924f0:
			"goodsimage/e87efc71db024bda9a7ce5808a580fed.jpg",
		f343e13006884a2a9c721ed18e67f275:
			"goodsimage/4b49b65c151040918e1dbeab1a4aa7c5.jpg",
	}; //商品id对应图片地址
	const getImages = (id) => {
		return `${apiUrl}/${goodIdToImgUrl[id]}`;
	};
	const userStore = useUserStore();

	const router = useRouter();
	// 总计订单商品数量和价格
	const allCount = ref();
	const totalPrice = ref();

	const orderListShow = ref({
		goodsName: [],
		count: [],
		price: [],
	});
	// 获取用户id
	const userId = userStore.userInfo;
	// 获取订单列表
	const orderLists = async () => {
		const res = await orderListAPI({ userId });
		console.log(111);
		console.log(res);

		res.forEach((item) => {
			item.orderDetail.forEach((detail) => {
				orderListShow.value.goodsName.push({
					name: detail.goodsName,
					imgurl: getImages(detail.goodsId),
				});
				orderListShow.value.count.push(detail.nums.split(",")[0].trim());
				orderListShow.value.price.push(detail.nums.split(",")[1].split("=")[1]);
			});
		});
		allCount.value = orderListShow.value.count.reduce(
			(total, num) => total + parseFloat(num),
			0
		);
		totalPrice.value = orderListShow.value.price.reduce(
			(total, num) => total + parseFloat(num),
			0
		);

		console.log(`goodsName::${orderListShow.value.goodsName}`);
		console.log(`goodsCount::${orderListShow.value.count}`);
		console.log(`goodsPrice::${orderListShow.value.price}`);
		console.log(res[0].orderDetail[0].goodsName);
	};
	orderLists();

	const submitOrder = () => {
		ElMessage({
			message: "提交订单成功",
			type: "success",
		});
		console.log(111);
		router.push({ path: "/pay" });
	};
</script>

<template>
	<HeaderVue helloText="订单页面"></HeaderVue>
	<div class="xtx-pay-checkout-page">
		<div class="container">
			<div class="wrapper">
				<!-- 商品信息 -->
				<h3 class="box-title">商品信息</h3>
				<div class="box-body">
					<table class="goods">
						<thead>
							<tr>
								<th width="520">商品信息</th>
								<th width="170">单价</th>
								<th width="170">数量</th>
								<!-- <th width="170">小计</th> -->
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(item, index) in orderListShow.goodsName"
								:key="index">
								<td>
									<a
										href="javascript:;"
										class="info">
										<div class="right">
											<p>
												<img
													:src="item.imgurl"
													alt="" />
												{{ item.name }}
											</p>
										</div>
									</a>
								</td>
								<td>
									<p>&yen;{{ orderListShow.price[index] }}</p>
								</td>
								<td>
									<p>{{ orderListShow.count[index] }}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- 配送时间 -->
				<h3 class="box-title">配送时间</h3>
				<div class="box-body">
					<a
						class="my-btn active"
						href="javascript:;"
						>不限送货时间：周一至周日</a
					>
					<a
						class="my-btn"
						href="javascript:;"
						>工作日送货：周一至周五</a
					>
					<a
						class="my-btn"
						href="javascript:;"
						>双休日、假日送货：周六至周日</a
					>
				</div>
				<!-- 支付方式 -->
				<h3 class="box-title">支付方式</h3>
				<div class="box-body">
					<a
						class="my-btn active"
						href="javascript:;"
						>在线支付</a
					>
					<a
						class="my-btn"
						href="javascript:;"
						>货到付款</a
					>
					<span style="color: #999">货到付款需付5元手续费</span>
				</div>
				<!-- 金额明细 -->
				<h3 class="box-title">金额明细</h3>
				<div class="box-body">
					<div class="total">
						<dl>
							<dt>商品件数：</dt>
							<dd>{{ allCount }}件</dd>
						</dl>
						<dl>
							<dt>商品总价：</dt>
							<dd>¥{{ totalPrice.toFixed(2) }}</dd>
						</dl>
						<dl>
							<dt>应付总额：</dt>
							<dd class="price">¥{{ totalPrice.toFixed(2) }}</dd>
						</dl>
					</div>
				</div>
				<!-- 提交订单 -->
				<div class="submit">
					<el-button
						type="primary"
						size="large"
						:plain="true"
						@click="submitOrder()"
						>提交订单</el-button
					>
				</div>
			</div>
		</div>
	</div>
	<!-- 切换地址 -->
	<!-- 添加地址 -->
</template>

<style scoped lang="scss">
	$xtxColor: #45c191;
	$priceColor: #67b587;
	.xtx-pay-checkout-page {
		margin-top: 20px;

		.wrapper {
			background: #fff;
			padding: 0 20px;

			.box-title {
				font-size: 16px;
				font-weight: normal;
				padding-left: 10px;
				line-height: 70px;
				border-bottom: 1px solid #f5f5f5;
			}

			.box-body {
				padding: 20px 0;
			}
		}
	}

	.address {
		border: 1px solid #f5f5f5;
		display: flex;
		align-items: center;

		.text {
			flex: 1;
			min-height: 90px;
			display: flex;
			align-items: center;

			.none {
				line-height: 90px;
				color: #999;
				text-align: center;
				width: 100%;
			}

			> ul {
				flex: 1;
				padding: 20px;

				li {
					line-height: 30px;

					span {
						color: #999;
						margin-right: 5px;

						> i {
							width: 0.5em;
							display: inline-block;
						}
					}
				}
			}

			> a {
				color: $xtxColor;
				width: 160px;
				text-align: center;
				height: 90px;
				line-height: 90px;
				border-right: 1px solid #f5f5f5;
			}
		}

		.action {
			width: 420px;
			text-align: center;

			.btn {
				width: 140px;
				height: 46px;
				line-height: 44px;
				font-size: 14px;

				&:first-child {
					margin-right: 10px;
				}
			}
		}
	}

	.goods {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;

		.info {
			display: flex;
			text-align: left;
			text-decoration: none;
			color: black;
			img {
				width: 70px;
				height: 70px;
				margin-right: 20px;
			}

			.right {
				line-height: 24px;

				p {
					&:last-child {
						color: #27ba9b;
					}
				}
			}
		}

		tr {
			th {
				background: #f5f5f5;
				font-weight: normal;
			}

			td,
			th {
				text-align: center;
				padding: 20px;
				border-bottom: 1px solid #f5f5f5;

				&:first-child {
					border-left: 1px solid #f5f5f5;
				}

				&:last-child {
					border-right: 1px solid #f5f5f5;
				}
			}
		}
	}

	.my-btn {
		width: 228px;
		height: 50px;
		border: 1px solid #e4e4e4;
		text-align: center;
		line-height: 48px;
		margin-right: 25px;
		color: #666666;
		display: inline-block;

		&.active,
		&:hover {
			border-color: $xtxColor;
		}
	}

	.total {
		dl {
			display: flex;
			justify-content: flex-end;
			line-height: 50px;

			dt {
				i {
					display: inline-block;
					width: 2em;
				}
			}

			dd {
				width: 240px;
				text-align: right;
				padding-right: 70px;

				&.price {
					font-size: 20px;
					color: $priceColor;
				}
			}
		}
	}

	.submit {
		text-align: right;
		padding: 60px;
		border-top: 1px solid #f5f5f5;
	}

	.addressWrapper {
		max-height: 500px;
		overflow-y: auto;
	}

	.text {
		flex: 1;
		min-height: 90px;
		display: flex;
		align-items: center;

		&.item {
			border: 1px solid #f5f5f5;
			margin-bottom: 10px;
			cursor: pointer;

			&.active,
			&:hover {
				border-color: $xtxColor;
				background: lighten($xtxColor, 50%);
			}

			> ul {
				padding: 10px;
				font-size: 14px;
				line-height: 30px;
			}
		}
	}
</style>
