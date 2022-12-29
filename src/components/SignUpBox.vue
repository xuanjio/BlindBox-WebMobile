<script setup lang="ts">
import { ref } from "vue";
import TabBar from "./TabBar.vue";

const emits = defineEmits(["close", "toLogin"])
// tabIndex: 0|手机注册，1|邮箱注册
const tabIndex = ref(0)
// 手机号 
const phone = ref("")
const phoneError = ref("")
// 邮箱
const mail = ref("")
const mailError = ref("")
// 验证码
const smscode = ref("")
const smscodeError = ref("")
const smscodeBtnText = ref("获取验证码")
// 昵称
const nickName = ref("")
const nickNameError = ref("")
// 密码
const password = ref("")
const passwordError = ref("")
// 邀请码
const invitationCode = ref("")
const invitationCodeError = ref("")
// 是否同意协议隐私
const isAgreed = ref(false)

// 点击注册按钮
function register() {

}

// 点击去登录按钮
function toLogin() {
    emits("close")
    emits("toLogin")
}

</script>

<template>
    <div id="sign-up">
        <!-- 关闭按钮 -->
        <div class="close" @click="$emit('close')">
            <img src="@/assets/images/sign/icon_close.png" alt="close">
        </div>
        <!-- 手机注册/邮箱注册 -->
        <div class="switch">
            <TabBar :items="['手机注册', '邮箱注册']" :tab-index="tabIndex" @click-item="(index) => { tabIndex = index }" />
        </div>
        <!-- 手机号 -->
        <div class="cell" v-show="tabIndex == 0" >
            <div class="content">
                <div class="icon">
                    <img src="@/assets/images/sign/icon_phone.png" alt="phone" />
                </div>
                <input v-model="phone" type="tel" placeholder="请输入手机号" />
            </div>
            <div class="error">{{ phoneError }}</div>
        </div>
        <!-- 邮箱 -->
        <div class="cell" v-show="tabIndex == 1">
            <div class="content">
                <div class="icon">
                    <img src="@/assets/images/sign/icon_email.png" alt="email" />
                </div>
                <input v-model="mail" type="email" placeholder="请输入邮箱" />
            </div>
            <div class="error">{{ mailError }}</div>
        </div>
        <!-- 验证码 -->
        <div class="cell">
            <div class="content">
                <div class="icon">
                    <img src="@/assets/images/sign/icon_verification.png" alt="smscode" />
                </div>
                <input v-model="smscode" type="number" placeholder="请输入验证码" />
                <div class="button">{{ smscodeBtnText }}</div>
            </div>
            <div class="error"> {{ smscodeError }}</div>
        </div>
        <!-- 密码 -->
        <div class="cell">
            <div class="content">
                <div class="icon">
                    <img src="@/assets/images/sign/icon_password.png" alt="password" />
                </div>
                <input v-model="password" type="password" placeholder="请输入密码(6~16位)" minlength="6" maxlength="16" />
            </div>
            <div class="error">{{ passwordError }}</div>
        </div>
        <!-- 昵称 -->
        <div class="cell">
            <div class="content">
                <div class="icon">
                    <img src="@/assets/images/sign/icon_user.png" alt="nickname" />
                </div>
                <input v-model="nickName" type="text" placeholder="请输入昵称(选填)" />
            </div>
            <div class="error">{{ nickNameError }}</div>
        </div>
        <!-- 邀请码 -->
        <div class="cell">
            <div class="content">
                <div class="icon">
                    <img src="@/assets/images/sign/icon_invitation.png" alt="invitation" />
                </div>
                <input v-model="invitationCode" type="email" placeholder="请输入邀请码(选填)" />
            </div>
            <div class="error">{{ invitationCodeError }}</div>
        </div>
        <!-- 同意协议隐私 -->
        <div class="agree">
            <p :class="{ active: isAgreed }" @click="isAgreed = !isAgreed">
                我已满18岁，并阅读和同意<span>《用户协议》</span>和<span>《隐私政策》</span>承诺理性消费</p>
        </div>
        <!-- 注册 去登录 -->
        <div class="register-login">
            <div class="register" @click="register">注册</div>
            <div class="login" @click="toLogin">去登录</div>
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

    .switch {
        padding-left: 10px;
        padding-top: 34px;
    }

    .cell {
        margin-top: 40px;
        padding: 0 80px;

        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: #DDD solid 1px;
            padding: 10px 10px;
            position: relative;

            .icon {
                width: 30px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 30px;
                }
            }

            input {
                margin: 0 40px;
                background: none;
                border: none;
                width: 100%;
                height: 60px;
                line-height: 60px;
                font-size: 24px;
            }

            .button {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 0 20px;
                height: 60px;
                box-sizing: border-box;
                font-size: 22px;
                line-height: 60px;
                text-align: center;
                border: var(--main-orange-color) solid 2px;
                border-radius: 4px;
            }
        }

        .error {
            height: 30px;
            margin-left: 80px;
            color: var(--main-orange-color);
            font-size: 20px;
            line-height: 40px;
        }
    }

    .agree {
        padding: 0 80px;
        margin-top: 20px;

        p {
            font-size: 20px;
            line-height: 30px;
            color: white;

            span {
                font-size: 20px;
                line-height: 30px;
                color: var(--main-orange-color);
            }

            &::before {
                display: inline-block;
                content: "";
                width: 20px;
                height: 20px;
                margin-right: 10px;
                background: url(@/assets/images/sign/icon_unselected.png) no-repeat center;
                background-size: contain;
            }

            &.active {
                &::before {
                    background: url(@/assets/images/sign/icon_selected.png) no-repeat center;
                    background-size: contain;
                }
            }
        }
    }

    .register-login {
        margin-top: 40px;
        padding: 0 80px;
        position: relative;

        .register {
            margin: 0 auto;
            width: 246px;
            height: 62px;
            font-size: 24px;
            font-weight: bold;
            color: var(--main-black-color);
            text-align: center;
            line-height: 62px;
            background: url(@/assets/images/common/btn_submit.png) no-repeat center;
            background-size: contain;
        }

        .login {
            font-size: 24px;
            line-height: 24px;
            color: var(--main-orange-color);
            position: absolute;
            top: 19px;
            right: 80px;
        }
    }
}
</style>