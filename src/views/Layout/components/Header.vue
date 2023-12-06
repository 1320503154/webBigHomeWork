<template>
    <div>
        <el-affix :offset="0">
            <div>
                <div class="nav_bg" v-if="!userStore.isLogin">
                    <el-button type="success" @click="$router.push('Login')">点我去登录</el-button>

                    <h1 class="helloText">{{ prop.helloText }}</h1>

                    <el-button @click="$router.push('Signup')" type="primary">点我去注册</el-button>
                </div>
                <div class="nav_bg" v-else="userStore.isLogin">
                    <el-button type="primary" @click="$router.push('cart')">点我去购物车</el-button>
                    <h1 class="helloText">{{ prop.helloText }}</h1>
                    <el-button type="danger" @click="userStore.clearUserInfo">点我退出登录</el-button>
                </div>
            </div>
        </el-affix>
    </div>
</template>

<script setup>

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const prop = defineProps({
    helloText: {
        type: String,
        default: '商品展示列表'
    }

})


</script>
<style lang="scss" scoped>
@mixin ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@mixin center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin bgImg($url) {
    background: url($url) no-repeat center / cover;
}

@mixin rounded {
    border-radius: 20px;
}

.nav_bg {
    background: url("cuteCat.jpg") no-repeat center / cover;
    margin-left: 10%;
    width: 80vw;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @include rounded;

}

.helloText {
    text-align: center;
    background-clip: text;
    -webkit-background-clip: text;
    color: rgba(0, 0, 0, 1);
    background: #fff;
    @include rounded;
}
</style>