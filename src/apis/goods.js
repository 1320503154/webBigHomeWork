import shopping from "@/utils/axios";
//封装获取商品列表的接口
export const getGoodList = () => {
	return shopping({
		url: `/goods/list`,
	});
};
