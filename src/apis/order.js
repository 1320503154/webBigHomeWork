import shopping from "@/utils/axios";
// 1. 生成订单
// 实现从购物车多选商品项生成订单功能
// 向后端传输userId、cartList字段，代表当前用户id，商品项列表（用','间隔）
// 接口格式
// http://10.60.82.164:8080/order/addCastOrder?userId=[userId]&cartList=[cartList]
// 接口示例
// http://10.60.82.164:8080/order/addCastOrder?userId=250f423a093f41319127a57b9bc0e5a8&cartList=b2d86ffdedab4c95ba7168b493834314,e4dac71d09da481a9f5efdfb6f41f181
// 返回值

// 2. 订单列表
// 创建用户订单列表，显示用户所有订单。
// 向后端传输userId，代表当前用户id。
// 接口格式
// http://[ip]:[port]/order/listByUser?userId=[userId]

// 接口示例
// http://10.60.82.164:8080/order/listByUser?userId=250f423a093f41319127a57b9bc0e5a8

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
