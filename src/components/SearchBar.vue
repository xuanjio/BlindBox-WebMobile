<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref("")
defineEmits(['change','search'])
</script>

<template>
    <div class="search-box">
        <input v-model="keyword" type="text" placeholder="请输入关键字" @change="$emit('change',keyword)" />
        <div class="btn" @click="$emit('search', keyword)">
            <img src="@/assets/images/common/icon_search.png" />
        </div>
    </div>
</template>

<style scoped lang="less">
.search-box {
    box-sizing: border-box;
    border: var(--main-orange-color) solid 4px;
    display: flex;
    align-items: center;

    input {
        background: none;
        border: none;
        flex: 1;
        color: white;
        font-size: 24px;
        margin: 0 10px;
        &::placeholder {
            color: white;
        }
    }

    .btn {
        width: 56px;
        height: 56px;
        margin-right: -1px;
        background-color: var(--main-orange-color);
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 36px;
            height: 32px;
        }
    }
}
</style>