<script setup lang="ts">
</script>

<template>
    <div class="select-box">
        <div class="text">进行中</div>
        <div class="arrow">
            <img src="@/assets/images/common/icon_arrow.png" />
        </div>
        
    </div>
</template>

<style scoped lang="less">
.select-box {
    position: relative;
    border: var(--main-orange-color) solid 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text {
        color: white;
        font-size: 24px;
        margin-left: 10px;
    }

    .arrow {
        width: 23px;
        height: 12px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>