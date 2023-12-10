import shopping from "@/utils/axios";
/*
1.加入商品
实现购物车添加商品功能，每次请求可以添加一项商品。
向后端传输userId、goodsId、num、price字段。分布代表用户id，商品id、商品数量、商品单价。

2.购物车列表
创建购物车列表界面，列出所有在购物车内的商品
向后端传输userId字段，代表当前用户id

3.删除商品
实现从购物车内删除商品项的功能
向后端传输userId、userId，代表当前用户id，商品项id。
每次请求删除一项商品，多选删除需要多次请求。
*/
export const insertCartAPI = ({ userId, goodsId, num, price }) => {
	return shopping({
		url: `/cart/add`,
		method: "get",
		params: {
			userId,
			goodsId,
			num,
			price,
		},
	});
};
// 列出所有在购物车内的商品
// 向后端传输userId字段，代表当前用户id
// http://[ip]:[port]/cart/listByUser?userId=[userId]
// 返回值
// Json数组 当前用户购物车内容
// cardid为购物车内商品项的id
export const getNewCartListAPI = ({ userId }) => {
	return shopping({
		url: `/cart/listByUser`,
		method: "get",
		params: {
			userId,
		},
	});
};
export const delCartAPI = ({ userId, cartId }) => {
	return shopping({
		url: `/cart/deleteById`,
		method: "get",
		params: {
			userId,
			cartId,
		},
	});
};
