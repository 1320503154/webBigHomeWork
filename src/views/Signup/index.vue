<template>
    <div class="main">
        <div class="container">
            <div class="form_area">
                <p class="title">注册一个账户</p>
                <form action="">
                    <div class="form_group">
                        <label class="sub_title" for="email">账户</label>
                        <input placeholder="输入你的账户名" v-model="formList.username" id="email" class="form_style"
                            type="username">
                    </div>
                    <div class="form_group">
                        <label class="sub_title" for="password">密码</label>
                        <input placeholder="输入你的密码" v-model="formList.password" id="password" class="form_style"
                            type="password">
                    </div>
                    <div>
                        <button @click="submitForm" class="btn">注册!</button>
                        <p>已经有了一个账户? <a class="link" href="" @click="toLogin">点我去登录!</a></p><a class="link" href="">
                        </a>
                    </div><a class="link" href="">

                    </a>
                </form>
            </div><a class="link" href="">
            </a>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();
const formList = reactive({
    username: "",
    password: "",
});
const submitForm = async () => {
    //提交登录表单
    const { username, password, } = formList;

    const result = await userStore.userSignUp({ username, password }); //执行仓库里的函数
    console.log('注册result::: ', result);
    //1.提示用户
    if (result) {
        ElMessage({
            type: "success",
            message: "注册成功",
        });
    }

    //2.跳转首页
    router.replace({ name: "LayOut" }); //使用replace方法,使得用户无法根据历史记录返回登录界面
};
const toLogin = () => {
    router.push({ name: "Login" });
}
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-image: url("/新海诚注册背景.png");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

}

.form_area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #EDDCD9;
    height: auto;
    width: auto;
    border: 2px solid #264143;
    border-radius: 20px;
    box-shadow: 3px 4px 0px 1px #E99F4C;
}

.title {
    color: #264143;
    font-weight: 900;
    font-size: 1.5em;
    margin-top: 20px;
}

.sub_title {
    font-weight: 600;
    margin: 5px 0;
}

.form_group {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin: 10px;
}

.form_style {
    outline: none;
    border: 2px solid #264143;
    box-shadow: 3px 4px 0px 1px #E99F4C;
    width: 290px;
    padding: 12px 10px;
    border-radius: 4px;
    font-size: 15px;
}

.form_style:focus,
.btn:focus {
    transform: translateY(4px);
    box-shadow: 1px 2px 0px 0px #E99F4C;
}

.btn {
    padding: 15px;
    margin: 25px 0px;
    width: 290px;
    font-size: 15px;
    background: #DE5499;
    border-radius: 10px;
    font-weight: 800;
    box-shadow: 3px 3px 0px 0px #E99F4C;
}

.btn:hover {
    opacity: .9;
}

.link {
    font-weight: 800;
    color: #264143;
    padding: 5px;
}
</style>