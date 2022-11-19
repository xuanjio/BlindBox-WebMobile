<script setup lang="ts">
defineProps<{
    avatarUrl: string
    frameUrl?: string
}>()
</script>

<template>
    <div class="avatar-frame">
        <img :src="avatarUrl" :style="frameUrl ? 'border:none' : ''" alt="avatar" />
        <img v-show="frameUrl" :src="frameUrl" alt="frame" />
    </div>
</template>

<style scoped lang="less">
.avatar-frame {
    width: 100%;
    height: 100%;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        &:first-child {
            border: var(--main-orange-color) solid 2px;
            border-radius: 50%;
        }
        &:last-child {
            width: 150%;
            height: 150%;
            transform: translate(-50%,-54%);
        }
    }
}
</style>