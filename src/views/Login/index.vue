<script setup>
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { userLogin } from "@/apis/user.js"; //登录接口函数
//引入仓库
import { useUserStore } from "@/stores/user";
//引入element-plus的消息提示组件
import { ElMessage } from "element-plus";
//引入表单组件
import { ElForm, ElFormItem, ElInput, ElCheckbox, ElButton } from "element-plus";
const userStore = useUserStore();
const router = useRouter();

//1.准备表单对象
const formList = reactive({
    account: "",
    password: "",
    agree: false,
});
//2.准备规则对象
const formRules = reactive({
    account: [
        {
            required: true,
            message: "用户名不能为空",
            trigger: "blur", //失去焦点时触发
        },
        {
            min: 5,
            max: 14,
            message: "用户名长度在5-14个字符之间",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "密码不能为空",
            trigger: "blur", //失去焦点时触发
        },
        {
            //最小6个字符,最大14个字符
            min: 5,
            max: 15,
            message: "密码长度在5-15个字符之间",
            trigger: "blur",
        },
    ],
    agree: [
        {
            validator: (rule, value, callback) => {
                if (value) {
                    callback(); //通过校验,调用一次通过校验函数
                } else {
                    callback(new Error("请勾选协议"));
                    //没通过,传入new Error实例
                }
            },
        },
    ],
});
const formRef = ref(null); //获取el:form表单实例

const submitForm = () => {
    //提交登录表单
    const formEL = formRef.value;
    const { account, password, agree } = formList;
    formEL.validate(async (valid) => {
        //valid为true表示所有的表单校验规则通过
        if (valid) {
            //TODO LOGIN
            const userId = await userStore.getUserInfo({ account, password }); //执行仓库里的函数
            console.log("登录userId::: ", userId);
            //1.提示用户
            ElMessage({
                type: "success",
                message: "登录成功",
            });
            //2.跳转首页
            router.replace({ name: "LayOut" }); //使用replace方法,使得用户无法根据历史记录返回登录界面
        } else {
            //校验不通过
            ElMessage({
                type: "error",
                message: "请检查登录信息",
            });
        }
    });
};
</script>

<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">
                        <span>Steam 商城</span>
                    </RouterLink>

                </h1>
                <RouterLink class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>

        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账户登录</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <el-form ref="formRef" :model="formList" :rules="formRules" label-position="right"
                            label-width="60px" status-icon>
                            <el-form-item label="账户" prop="account">
                                <el-input v-model="formList.account" />
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="formList.password" />
                            </el-form-item>
                            <el-form-item label-width="22px" prop="agree">
                                <el-checkbox size="large" v-model="formList.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>
                            <el-button size="large" class="subBtn" @click="submitForm"
                                @keyup.enter="submitForm">点击登录</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>

        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">我是底部</a>
                    <a href="javascript:;">完成任务</a>
                    <a href="javascript:;">复习功课</a>
                    <a href="javascript:;">好好学习</a>
                    <a href="javascript:;">考上高分</a>
                    <a href="javascript:;">想要工资</a>
                    <a href="javascript:;">快乐生活</a>
                </p>
                <p>CopyRight &copy; 李昊戈</p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="scss">
$xtxColor: #ff6700;
$priceColor: #f56c6c;

.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            position: relative;
            background: url("@/assets/images/logo.png") no-repeat center 0px / contain;
        }

        span {
            width: 100%;
            position: absolute;
            right: -100%;
            top: 50%;
            transform: translateY(-50%);
            color: rgb(86, 167, 152);
            font-size: 36px;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
            z-index: 100;
        }
    }

    .sub {
        flex: 1;
        font-size: 24px;
        font-weight: normal;
        margin-bottom: 38px;
        margin-left: 20px;
        color: #666;
    }

    .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;

        i {
            font-size: 14px;
            color: $xtxColor;
            letter-spacing: -5px;
        }
    }
}

.login-section {
    background: url("@/assets/images/login-bg.png") no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 54px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }
    }
}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}

.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: $xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: $priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: $xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: $priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: $xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}

.subBtn {
    background: $xtxColor;
    width: 100%;
    color: #fff;
}
</style>
