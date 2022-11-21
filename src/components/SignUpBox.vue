<script setup lang="ts">
import { ref } from "vue";
defineEmits(["close"])
// tabIndex: 0|账号密码登录，1|手机验证码登录
const tabIndex = ref(0)
</script>

<template>
    <div id="sign-up">
        <!-- 关闭按钮 -->
        <div class="close" @click="$emit('close')">
            <img src="@/assets/images/sign/icon_close.png" alt="close">
        </div>
        <!-- 账号密码登录/手机验证码登录 -->
        <div class="tab-bar">
            <div class="tab-item" :class="{active:tabIndex==0}" @click="tabIndex=0">账号密码登录</div>
            <div class="tab-item" :class="{active:tabIndex==1}" @click="tabIndex=1">手机验证码登录</div>
        </div>
    </div>
</template>

<style scoped lang="less">
#sign-up {
    width: 699px;
    height: 1088px;
    background: url(@/assets/images/sign/signup_box.png) no-repeat center;
    background-size: contain;
    position: relative;

    .close {
        width: 80px;
        height: 80px;
        right: 2px;
        top: 30px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 37px;
            height: 40px;
        }
    }

    .tab-bar {
        display: flex;
        align-items: center;
        .tab-item {

        }
    }
}
</style>