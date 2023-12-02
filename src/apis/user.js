import shopping from "@/utils/axios";

export const userRegister = ({ name, password }) => {
	return shopping({
		url: `/user/register`,
		method: "get",
		params: {
			name,
			password,
		},
	});
};
export const userLogin = ({ name, password }) => {
	return shopping({
		url: `/user/login`,
		method: "get",
		params: {
			name,
			password,
		},
	});
};
/*
（1）用户注册
创建用户注册页面，实现用户注册功能。
向后端传输name、和password字段。
若注册成功返回‘OK’，注意不要重复注册相同的登录名。

接口格式
http://[ip]:[port]/user/register?name=[logname]&password=[password]
接口示例
http://10.60.82.164:8080/user/register?name=jianhgao3&password=123456

返回值
OK

（2）用户登录
创建用户登录界面，实现用户登录功能
向后端传输name、和password字段。
若注册成功返回用户id，该id用于购物车商品添加删除，生成和查询订单。
接口格式
http://[ip]:[port]/user/login?name=[logname]&password=[password]

接口示例
http:/10.60.82.164:8080/user/login?name=jianhgao3&password=123456

返回值
用户id
25d828ead3ba4d8e9326100b4f42645e

*/
