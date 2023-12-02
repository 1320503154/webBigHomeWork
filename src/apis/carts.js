import shopping from "@/utils/axios";
/*
1.加入商品
实现购物车添加商品功能，每次请求可以添加一项商品。
向后端传输userId、goodsId、num、price字段。分布代表用户id，商品id、商品数量、商品单价。
接口格式
http://[ip]:[port]/cart/add?userId=[userId]&goodsId=[goodsId]&num=[num]&price=[price]

接口示例
http://10.60.82.164:8080/cart/add?userId=7a3ae031010a4358b500925941c6019c&goodsId=034db61a861345f9bb681b7f283dd1e1&num=2&price=3499

2.购物车列表
创建购物车列表界面，列出所有在购物车内的商品
向后端传输userId字段，代表当前用户id
接口格式
http://[ip]:[port]/cart/listByUser?userId=[userId]


接口示例
http://10.60.82.164:8080/cart/listByUser?userId=250f423a093f41319127a57b9bc0e5a8


3.删除商品
实现从购物车内删除商品项的功能
向后端传输userId、userId，代表当前用户id，商品项id。
每次请求删除一项商品，多选删除需要多次请求。

接口格式
http://[ip]:[port]/cart/deleteById?userId=[userId]&cartId=[userId]


接口示例
http://10.60.82.164:8080/cart/deleteById?userId=7a3ae031010a4358b500925941c6019c&cartId=29ade395dfd14162879e71ca901b389b

*/
export const addCart = ({ userId, goodsId, num, price }) => {
	return shopping({
		url: `/carts/add`,
		method: "get",
		params: {
			userId,
			goodsId,
			num,
			price,
		},
	});
};
export const getCartList = ({ userId }) => {
	return shopping({
		url: `/carts/listByUser`,
		method: "get",
		params: {
			userId,
		},
	});
};
export const deleteCart = ({ userId, cartId }) => {
	return shopping({
		url: `/carts/deleteById`,
		method: "get",
		params: {
			userId,
			cartId,
		},
	});
};
