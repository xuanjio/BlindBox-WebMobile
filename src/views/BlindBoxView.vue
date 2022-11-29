<script setup lang="ts">
import { API } from '@/api/API';
import { onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
import HistoryList from '@/components/HistoryList.vue';
import SkinsList from '@/components/SkinsList.vue';
import AvatarFrame from '@/components/AvatarFrame.vue';
import { Notify } from "vant";

const route = useRoute()
const router = useRouter()
const boxInfo = ref({} as any)
const openPrice = ref(0)
const openText = ref("一发入魂")
const openCount = ref(1)
const animated = ref(true)
const tabIndex = ref(0)
const historyData = ref(<any>[])
let historyTimer: number | null = null

onMounted(() => {
    fetchBoxInfo()
})

onBeforeUnmount(() => {
    stopHistoryTimer()
})

watch(() => route.query, (to) => {
    fetchBoxInfo()
    boxInfo.value = {}
    tabIndex.value = 0
})

watch(() => tabIndex.value, () => {
    if (tabIndex.value == 0) {
        stopHistoryTimer()
    } else if (tabIndex.value == 1) {
        fetchHistoryData()
        startHistoryTimer()
    }
})

function fetchBoxInfo() {
    const boxId = route.query.id as any
    API.fetchBlindBoxDetail(boxId, (result) => {
        if (result.code == 200 && result.data && result.data.boxName) {
            boxInfo.value = result.data
            clickBatteryItem(1)
        } else {
            Notify({ type: "danger", message: "箱子已下架！" })
            router.push("/")
        }
    })
}

function clickBatteryItem(index: number) {
    openCount.value = index
    openPrice.value = (boxInfo.value.price * index)
    switch (index) {
        case 1:
            openText.value = "一发入魂"
            break;
        case 2:
            openText.value = "奇迹再现"
            break;
        case 3:
            openText.value = "王者归来"
            break;
        case 4:
            openText.value = "火力全开"
            break;
        case 5:
            openText.value = "九五至尊"
            break;
    }
}

function openBox() {

}

function fetchHistoryData() {
    const boxId = route.query.id as any
    API.fetchBlindBoxHistory(boxId, 20, (result) => {
        if (result.code == 200 && result.data) {
            historyData.value = result.data
        }
    })
}

function startHistoryTimer() {
    stopHistoryTimer()
    historyTimer = setInterval(() => {
        fetchHistoryData()
    }, 5000)
}

function stopHistoryTimer() {
    if (historyTimer) {
        clearInterval(historyTimer)
        historyTimer = null
    }
}

</script>

<template>
    <div id="blind-box">
        <!-- 顶部 -->
        <div class="top">
            <!-- 历史掉落 -->
            <HistoryList />

            <!-- 标题 -->
            <div class="title">
                {{ boxInfo.boxName }}
            </div>

            <!-- 箱子 -->
            <div class="box" :style="'background-image: url(' + boxInfo.imgUrl + ')'">
                <img :src="boxInfo.goodsImgUrl" :alt="boxInfo.boxName">
            </div>

            <!-- 电池 -->
            <div class="battery">
                <div class="item" v-for="index in 5" :class="{ active: index <= openCount }"
                    @click="clickBatteryItem(index)">
                    {{ index }}
                </div>
            </div>

            <!-- 价格 -->
            <div class="price">
                <img src="@/assets/images/common/icon_gold.png" alt="gold" />
                {{ openPrice.toFixed(2) }}
            </div>

            <!-- 操作按钮 -->
            <div class="open">
                <div class="open-btn" @click="openBox">
                    {{ openText }}
                </div>
                <div class="switch-btn" :class="{ active: animated }" @click="animated = !animated">
                </div>
            </div>
        </div>

        <!-- 切换按钮 -->
        <div class="tab-bar">
            <div class="tab-item" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0">盒子包含</div>
            <div class="tab-item" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">最近掉落</div>
        </div>

        <!-- 温馨提示 -->
        <div class="notice-bar">
            <van-notice-bar scrollable text="温馨提示: 饰品提取时出现任何问题,一定联系客服解决,切勿上头!" color="white" />
        </div>

        <!-- 盒子包含 -->
        <SkinsList :list="boxInfo.goodsList" v-show="tabIndex == 0" />

        <!-- 最近掉落 -->
        <div class="history" v-show="tabIndex == 1">
            <div class="item" v-for="item in historyData">
                <!-- 头像 -->
                <div class="avatar">
                    <AvatarFrame :avatar-url="item.userIcon" :frame-url="item.iconUrl" />
                </div>
                <!-- 价格 -->
                <div class="price">
                    {{ item.price }}
                </div>
                <!-- 名称 -->
                <div class="name text-ellipsis">
                    {{ item.goodsName }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
#blind-box {
    min-height: calc(100vh - 500px);
    padding-bottom: 60px;

    .top {
        width: 750px;
        height: 886px;
        background: url(@/assets/images/blindbox/bg.png) no-repeat top;
        background-size: contain;
        padding-top: 10px;
        margin-bottom: 280px;

        .title {
            height: 58px;
            background: url(@/assets/images/common/title_back.png) no-repeat center;
            background-size: contain;
            font-family: titlefont;
            text-align: center;
            line-height: 58px;
            font-size: 24px;
            margin-top: 60px;
        }

        .box {
            width: 380px;
            height: 380px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px auto;

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .battery {
            width: 508px;
            height: 340px;
            background: url(@/assets/images/blindbox/battery_bg.png) no-repeat center;
            background-size: contain;
            margin: 0 auto;
            margin-top: -50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 130px;
            padding-bottom: 50px;
            padding-left: 85px;
            padding-right: 125px;

            .item {
                width: 40px;
                height: 138px;
                background: url(@/assets/images/blindbox/btn.png) no-repeat center;
                background-size: contain;
                font-family: titlefont;
                font-size: 26px;
                text-align: center;
                line-height: 138px;
                position: relative;

                &.active {
                    background: url(@/assets/images/blindbox/btn_active.png) no-repeat center;
                    background-size: contain;

                    &::before {
                        display: block;
                        content: "";
                        width: 40px;
                        height: 40px;
                        top: 10px;
                        background: url(@/assets/images/blindbox/lightning.png) no-repeat center;
                        background-size: contain;
                        position: absolute;
                    }
                }
            }
        }

        .price {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--main-orange-color);
            font-size: 32px;
            font-weight: bold;

            img {
                width: 50px;
                height: 50px;
            }
        }

        .open {
            margin-top: 20px;
            height: 62px;
            position: relative;

            .open-btn {
                width: 246px;
                height: 62px;
                background: url(@/assets/images/common/btn_submit.png) no-repeat center;
                background-size: contain;
                color: var(--main-black-color);
                font-size: 26px;
                font-weight: bold;
                text-align: center;
                line-height: 62px;
                margin: 0 auto;
            }

            .switch-btn {
                width: 56px;
                height: 56px;
                position: absolute;
                top: 3px;
                right: 120px;
                background: url(@/assets/images/blindbox/animation_off.png) no-repeat center;
                background-size: contain;

                &.active {
                    background: url(@/assets/images/blindbox/animation_on.png) no-repeat center;
                    background-size: contain;
                }
            }
        }
    }

    .notice-bar {
        height: 80px;
        padding: 20px 20px;

        &:deep(.van-notice-bar) {
            width: 100%;
            height: 100%;
            padding: 0 20px;
            background-color: hsla(0, 0%, 100%, 0.07);
            border-radius: 20px;
        }

        &:deep(.van-notice-bar__content) {
            font-size: 20px;
        }
    }

    .tab-bar {
        display: flex;
        align-items: center;
        margin: 0 20px;
        height: 60px;
        box-sizing: border-box;
        border-bottom: var(--main-orange-color) solid 4px;

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

    .history {
        padding: 0 20px;
        box-sizing: border-box;
        min-height: 500px;

        .item {
            height: 110px;
            display: flex;
            align-items: center;
            padding: 0 25px;
            box-sizing: border-box;
            background-color: #181C28;

            &:nth-child(2n) {
                background-color: #20222A;
            }

            .avatar {
                width: 60px;
                height: 60px;
            }

            .price {
                width: 150px;
                font-size: 28px;
                font-weight: bold;
                color: var(--main-orange-color);
                margin-left: 50px;
            }

            .name {
                font-size: 22px;
                margin-left: 10px;
            }
        }

    }
}
</style>