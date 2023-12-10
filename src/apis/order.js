import shopping from "@/utils/axios";
// 1. 生成订单
// 实现从购物车多选商品项生成订单功能
// 向后端传输userId、cartList字段，代表当前用户id，商品项列表（用','间隔）

// 2. 订单列表
// 创建用户订单列表，显示用户所有订单。
// 向后端传输userId，代表当前用户id。

export const createOrderAPI = ({ userId, orderList }) => {
	return shopping({
		url: `/order/addCastOrder`,
		method: "get",
		params: {
			userId,
			cartList: orderList,
		},
	});
};
export const orderListAPI = ({ userId }) => {
	return shopping({
		url: `/order/listByUser`,
		method: "get",
		params: {
			userId,
		},
	});
};
