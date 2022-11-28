<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AvatarFrame from './AvatarFrame.vue';

const emits = defineEmits(['hide'])
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const menus = [{
    icon: "src/assets/images/icons/personal.png",
    name: "profile",
    title: "个人资料"
},
{
    icon: "src/assets/images/icons/knapsack.png",
    name: "knapsack",
    title: "我的背包"
},
{
    icon: "src/assets/images/icons/recharge.png",
    name: "recharge",
    title: "账户充值"
},
{
    icon: "src/assets/images/icons/detailed.png",
    name: "user-data",
    title: "个人明细"
},
{
    icon: "src/assets/images/icons/extension.png",
    name: "promotion",
    title: "推广分红"
},
{
    icon: "src/assets/images/icons/info.png",
    name: "message",
    title: "站内信息"
},
{
    icon: "src/assets/images/icons/help.png",
    name: "help",
    title: "帮助中心"
}]
const avatarUrl = ref("https://95-csgo.oss-cn-beijing.aliyuncs.com/usericon/2022-05-24/36a810538eeb462c8565253188929854.jpg")
const frameUrl = ref("https://95-csgo.oss-cn-beijing.aliyuncs.com/file/2022-05-16/6c8ed872da224f948ebe56b927f00bdd.png")

function clickItem(name: string) {
    emits('hide')
    router.push({name: name})
}

</script>

<template>
    <div id="side-user">
        <!-- 顶部 -->
        <div class="top">
            <!-- 头像 相框 -->
            <div class="avatar">
                <AvatarFrame :avatar-url="userStore.userInfo.avatarUrl" />
            </div>
            <!-- 昵称 -->
            <div class="nickname">{{ userStore.userInfo.nickName }}</div>
            <!-- 金币余额 弹药余额 -->
            <div class="blance">
                <div>
                    <img src="@/assets/images/common/icon_gold.png" alt="" />
                    <span>{{ userStore.userInfo.goldBalance }}</span>
                </div>
                <div>
                    <img src="@/assets/images/common/icon_bullet.png" alt="" />
                    <span>{{ userStore.userInfo.bulletBalance }}</span>
                    <img src="@/assets/images/profile/arrow.png" alt="" />
                </div>
            </div>
            <!-- 充值 -->
            <div class="recharge">充值</div>
        </div>
        <!-- 导航列表 -->
        <div class="nav-list">
            <div class="nav-item" v-for="item in menus" :key="item.name" :class="{ active: item.name == route.name }"
                @click="clickItem(item.name)">
                <img :src=item.icon :alt=item.name />
                {{ item.title }}
            </div>
        </div>
        <!-- 退出登录 -->
        <div class="logout">退出登录</div>
    </div>
</template>

<style scoped lang="less">
#side-user {
    width: 100%;
    min-height: 100%;
    background: url(@/assets/images/profile/bg_bottom.png) no-repeat bottom, var(--main-black-color);
    background-size: contain;
    position: relative;
    padding-bottom: 160px;

    .top {
        width: 100%;
        background: url(@/assets/images/profile/bg_top.png) no-repeat center;
        background-size: cover;
        padding-top: 30px;
        padding-bottom: 20px;
        border-bottom: var(--main-orange-color) solid 3px;
        text-align: center;

        .avatar {
            width: 120px;
            height: 120px;
            margin: 0 auto;
        }

        .nickname {
            margin-top: 30px;
            font-size: 26px;
            font-weight: bold;
            text-align: center;
        }

        .blance {
            display: inline-block;
            text-align: left;

            div {
                margin-top: 15px;
                display: flex;
                align-items: center;
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 5px;

                    &:last-child {
                        width: 20px;
                        height: 22px;
                        margin-left: 5px;
                        margin-right: 0;
                    }
                }

                span {
                    font-size: 26px;
                    font-weight: bold;
                    color: var(--main-orange-color);
                    &:nth-last-child(2) {
                        color: rgb(43, 188, 242); 
                    }
                }
            }
        }

        .recharge {
            margin: 20px auto;
            width: 220px;
            height: 50px;
            background: url(@/assets/images/profile/btn_recharge.png) no-repeat center;
            background-size: contain;
            font-size: 26px;
            font-weight: bold;
            line-height: 50px;
            text-align: center;
            color: var(--main-black-color);
        }
    }

    .nav-list {
        width: 100%;

        .nav-item {
            width: 100%;
            height: 100px;
            padding-left: 10px;
            display: flex;
            align-items: center;
            font-size: 26px;
            position: relative;

            img {
                width: 30px;
                margin: 0 20px;
            }

            &.active {
                background-color: rgba(255, 255, 255, 0.04);
                color: var(--main-orange-color);
            }
        }
    }

    .logout {
        width: 250px;
        height: 60px;
        line-height: 62px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        color: var(--main-black-color);
        background: url(@/assets/images/common/btn_submit.png) no-repeat center;
        background-size: contain;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 50px;
    }
}
</style>