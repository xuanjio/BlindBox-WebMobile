<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const showed = ref(false)
const items = [
    {
        icon: "src/assets/images/icons/redbag.png",
        name: "redbag",
        title: ""
    },
    {
        icon: "src/assets/images/icons/recharge.png",
        name: "recharge",
        title: "充值"
    },
    {
        icon: "src/assets/images/icons/activity.png",
        name: "task",
        title: "任务"
    },
    {
        icon: "src/assets/images/icons/knapsack.png",
        name: "knapsack",
        title: "背包"
    },
    {
        icon: "src/assets/images/icons/appdownload.png",
        name: "download",
        title: "app下载"
    },
    {
        icon: "src/assets/images/icons/service.png",
        name: "service",
        title: "客服"
    },
    {
        icon: "src/assets/images/icons/wechat.png",
        name: "wechat",
        title: "群聊"
    }
]
function clickItem(name: string) {
    if (name == 'service') {
        
    } else if (name == 'wechat') {

    } else {
        router.push({name: name})
    }
}
</script>

<template>
    <div id="side-bar" :class="{active: showed}">
        <!-- 开关按钮 -->
        <div class="switch-btn" :class="{active: showed}" @click="showed = !showed">
            <img src="@/assets/images/common/arrow_toolbar.png" alt="arrow"/>
        </div>
        <!-- 列表 -->
        <div class="list">
            <div class="item" v-for="item in items" :key="item.name" @click="clickItem(item.name)">
                <img :src="item.icon" :alt="item.name">
                <p v-if="item.title">{{item.title}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
#side-bar {
    width: 150px;
    z-index: 99;
    position: fixed;
    right: -110px;
    bottom: 200px;
    display: flex;
    align-items: center;
    transition: 0.3s;
    &.active {
        right: 0;
    }
    .switch-btn {
        width: 40px;
        height: 130px;
        background-color: var(--main-orange-color);
        border-radius: 6px 0 0 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 25px;
            transition: 0.25s;
        }
        &.active {
            img {
                transform: rotate(180deg);
            }
        }
    }
    .list {
        width: 110px;
        padding: 30px 0;
        background-color: var(--main-black-color);
        border-radius: 16px 0 0 16px;
        .item {
            width: 100%;
            text-align: center;
            margin-bottom: 30px;
            &:last-child {
                margin-bottom: 0;
            }
            img {
                width: 36px;
                margin-bottom: 5px;
            }
            p {
                font-size: 20px;
                color: white;
            }
        }
    }
}
</style>