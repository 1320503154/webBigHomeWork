<template>
    <div>
        <h1>我是LayOut页面</h1>
        <div v-if="goodList" class="goods-list">
            <GoodsItem v-for="goods in goodList" :key="goods.id" :goods="goods" />
        </div>
    </div>
</template>

<script setup>

import { ref, computed, reactive, onMounted } from "vue";
import GoodsItem from '@/components/GoodsItem.vue';
import { getGoodList } from '@/apis/goods';
const goodList = ref([]);
onMounted(async () => {
    goodList.value = await getGoodList();
    console.log(goodList.value);
});
</script>

<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px;
}
</style>