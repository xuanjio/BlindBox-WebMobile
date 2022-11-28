<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["close", "toLogin"])
// tabIndex: 0|手机找回密码，1|邮箱找回密码
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
// 密码
const password = ref("")
const passwordError = ref("")
// 重复密码
const repassword = ref("")
const repasswordError = ref("")

// 点击找回密码按钮
function resetPassword() {

}

// 点击去登录按钮
function toLogin() {
    emits("close")
    emits("toLogin")
}

</script>

<template>
    <div id="reset-password">
        <!-- 关闭按钮 -->
        <div class="close" @click="$emit('close')">
            <img src="@/assets/images/sign/icon_close.png" alt="close">
        </div>

        <!-- 手机找回密码/邮箱找回密码 -->
        <div class="tab-bar">
            <div class="tab-item" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0">手机找回密码</div>
            <div class="tab-item" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">邮箱找回密码</div>
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

        <!-- 重复密码 -->
        <div class="cell">
            <div class="content">
                <div class="icon">
                    <img src="@/assets/images/sign/icon_password.png" alt="password" />
                </div>
                <input v-model="repassword" type="password" placeholder="请确认密码(6~16位)" minlength="6" maxlength="16" />
            </div>
            <div class="error">{{ repasswordError }}</div>
        </div>
        
        <!-- 找回 去登录 -->
        <div class="reset-login">
            <div class="reset" @click="resetPassword">找回密码</div>
            <div class="login" @click="toLogin">去登录</div>
        </div>
    </div>
</template>

<style scoped lang="less">
#reset-password {
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
        padding-left: 10px;
        padding-top: 34px;

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

    .cell {
        margin-top: 80px;
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

    .reset-login {
        margin-top: 60px;
        padding: 0 80px;
        position: relative;

        .reset {
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