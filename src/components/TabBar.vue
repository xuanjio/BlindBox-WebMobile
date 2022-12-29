<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    items: string[]
    tabIndex: number
}>()
defineEmits(['clickItem'])
</script>

<template>
    <div class="tab-bar">
        <div class="tab-item" v-for="item, index in items" :class="{ active: tabIndex == index }" @click="$emit('clickItem', index)">{{ item }}</div>
    </div>
</template>

<style scoped lang="less">
.tab-bar {
    display: flex;
    align-items: center;
    height: 60px;
    box-sizing: border-box;

    .tab-item {
        width: 256px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 24px;
        font-weight: bold;
        color: white;

        &.active {
            color: var(--main-black-color);
        }

        &:first-child {
            background: url(@/assets/images/common/btn_first_unselected.png) no-repeat center;
            background-size: contain;

            &.active {
                background: url(@/assets/images/common/btn_first_selected.png) no-repeat center;
                background-size: contain;
            }
        }

        &:last-child {
            background: url(@/assets/images/common/btn_last_unselected.png) no-repeat center;
            background-size: contain;
            margin-left: -32px;

            &.active {
                background: url(@/assets/images/common/btn_last_selected.png) no-repeat center;
                background-size: contain;
            }
        }
    }
}
</style>