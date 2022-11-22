<script setup lang="ts">
import { ref } from "vue";
defineEmits(["close"])
// tabIndex: 0|账号密码登录，1|手机验证码登录
const tabIndex = ref(0)
// 账号 密码
const account = ref("")
const accountError = ref("*请输入正确的账号")
const password = ref("")
const passwordError = ref("*密码不正确")
// 手机号 验证码
const phone = ref("")
const phoneError = ref("*手机号已注册")
const smscode = ref("")
const smscodeError = ref("*验证码不正确")
const smscodeBtnText = ref("获取验证码")
// 是否保存密码 是否同意协议隐私
const isSaved = ref(false)
const isAgreed = ref(false)

</script>

<template>
    <div id="sign-in">
        <!-- 关闭按钮 -->
        <div class="close" @click="$emit('close')">
            <img src="@/assets/images/sign/icon_close.png" alt="close">
        </div>
        <!-- 账号密码登录/手机验证码登录 -->
        <div class="tab-bar">
            <div class="tab-item" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0">账号密码登录</div>
            <div class="tab-item" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">手机验证码登录</div>
        </div>
        <!-- 账号密码登录 -->
        <div v-show="tabIndex == 0">
            <!-- 账号 -->
            <div class="cell">
                <div class="content">
                    <div class="icon">
                        <img src="@/assets/images/sign/icon_user.png" alt="account" />
                    </div>
                    <input v-model="account" type="email" placeholder="请输入账号" />
                </div>
                <div class="error">{{ accountError }}</div>
            </div>
            <!-- 密码 -->
            <div class="cell">
                <div class="content">
                    <div class="icon">
                        <img src="@/assets/images/sign/icon_password.png" alt="password" />
                    </div>
                    <input v-model="password" type="password" placeholder="请输入密码" />
                </div>
                <div class="error">{{ passwordError }}</div>
            </div>
        </div>
        <!-- 手机验证码登录 -->
        <div v-show="tabIndex == 1">
            <!-- 手机号 -->
            <div class="cell">
                <div class="content">
                    <div class="icon">
                        <img src="@/assets/images/sign/icon_phone.png" alt="phone" />
                    </div>
                    <input v-model="phone" type="tel" placeholder="请输入手机号" />
                </div>
                <div class="error">{{ phoneError }}</div>
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
        </div>
        <!-- 记住密码 忘记密码 -->
        <div class="saved-forgot">
            <span v-show="tabIndex == 0" :class="{ active: isSaved }" @click="isSaved = !isSaved">记住密码</span>
            <span>忘记密码</span>
        </div>
        <!-- 同意协议隐私 -->
        <div class="agree">
            <p :class="{ active: isAgreed }" @click="isAgreed = !isAgreed">
                我已满18岁，并阅读和同意<span>《用户协议》</span>和<span>《隐私政策》</span>承诺理性消费</p>
        </div>
        <!-- steam 一键登录 -->
        <div class="steam">
            <img src="@/assets/images/sign/icon_steam.png" alt="steam" />
            <p>steam一键登录</p>
        </div>
        <!-- 登录 去注册 -->
        <div class="logout-register">
            <div class="logout">登录</div>
            <div class="register">去注册</div>
        </div>
    </div>
</template>

<style scoped lang="less">
#sign-in {
    width: 699px;
    height: 919px;
    background: url(@/assets/images/sign/signin_box.png) no-repeat center;
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
        margin-top: 60px;
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
            height: 40px;
            margin-left: 80px;
            color: var(--main-orange-color);
            font-size: 20px;
            line-height: 40px;
        }
    }

    .saved-forgot {
        margin-top: 20px;
        padding: 0 80px;
        height: 24px;

        span {
            font-size: 24px;
            line-height: 24px;
            color: white;

            &:first-child {
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

            &:last-child {
                float: right;
            }
        }
    }

    .agree {
        padding: 0 80px;
        margin-top: 40px;

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

    .steam {
        margin-top: 40px;
        text-align: center;

        img {
            width: 80px;
            height: 80px;
        }

        p {
            font-size: 24px;
        }
    }

    .logout-register {
        margin-top: 40px;
        padding: 0 80px;
        position: relative;

        .logout {
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

        .register {
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