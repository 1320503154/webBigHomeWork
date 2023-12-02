<script setup>
import { computed, defineProps } from 'vue';

const apiUrl = "http://10.60.82.146:8080";
const props = defineProps({
    goods: {
        type: Object,
        default: () => { }
    }
});

const imgUrl = computed(() => {
    return `${apiUrl}/${props.goods.pthumbnail}`;
});
console.log(props.goods);
</script>

<template>
    <RouterLink to="/" class="goods-item">
        <img :src="imgUrl" alt="" />
        <p class="name ellipsis">{{ props.goods.name }}</p>
        <p class="price">&yen;{{ props.goods.price1 }}</p>
    </RouterLink>
</template>


<style scoped lang="scss">
.goods-item {
    display: block;
    width: 220px;
    padding: 20px 30px;
    text-align: center;
    transition: all .5s;

    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
        width: 160px;
        height: 160px;
    }

    p {
        padding-top: 10px;
    }

    .name {
        font-size: 16px;
    }

    .desc {
        color: #999;
        height: 29px;
    }

    .price {
        color: #ff6700;
        font-size: 20px;
    }
}
</style>