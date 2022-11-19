<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const menus = [{
    icon: "src/assets/images/icons/home.png",
    name: "home",
    title: "首页"
},
{
    icon: "src/assets/images/icons/roll.png",
    name: "roll",
    title: "ROLL房"
},
{
    icon: "src/assets/images/icons/exchange.png",
    name: "exchange",
    title: "汰换合约"
},
{
    icon: "src/assets/images/icons/level.png",
    name: "level-box",
    title: "等级盲盒"
},
{
    icon: "src/assets/images/icons/time.png",
    name: "time-box",
    title: "时间盲盒"
},
{
    icon: "src/assets/images/icons/admission.png",
    name: "promotion-box",
    title: "推广盲盒"
},
{
    icon: "src/assets/images/icons/mall.png",
    name: "mall",
    title: "弹药商城"
},
{
    icon: "src/assets/images/icons/battle.png",
    name: "battle",
    title: "欧皇对战"
},
{
    icon: "src/assets/images/icons/ceremony.png",
    name: "lucky",
    title: "幸运好礼"
}]

const emits = defineEmits(['hide'])
const router = useRouter()
const route = useRoute()

function clickItem(name: string) {
    emits('hide')
    router.push({name: name})
}

</script>

<template>
    <div id="side-menu">
        <div class="side-menu-item" v-for="item in menus" :key="item.name" :class="{active:item.name == route.name}" @click="clickItem(item.name)">
            <img :src=item.icon :alt=item.name />
            {{item.title}}
        </div>
    </div>
</template>

<style scoped lang="less">
#side-menu {
    width: 100%;
    height: 100%;
    background-color: var(--main-black-color);
    padding-top: 100px;
    .side-menu-item {
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
            &:before {
                display: block;
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 10px;
                height: 100%;
                background-color: var(--main-orange-color);
            }
        }
    }

}
</style>