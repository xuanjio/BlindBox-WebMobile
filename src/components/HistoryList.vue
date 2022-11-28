<script setup lang="ts">
import { API, APIResult } from "@/api/API";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper";
import 'swiper/css';
import AvatarFrame from '@/components/AvatarFrame.vue';

const router = useRouter()
// 历史掉落
const historyList = ref(<any>[])
const modules = [Autoplay]
onMounted(() => {
    fetchHistoryList()
})

function fetchHistoryList() {
    API.fetchHomeHistoryList(10, (result: APIResult) => {
        if (result.code == 200 && result.data) {
            historyList.value = result.data
        }
    })
}

function clickHistoryItem(item: any) {
    if (item.dataType == 1) {
        // 盲盒
        router.push({ name: "blind-box", query: { id: item.dataId } })
    } else if (item.dataType == 2) {
        // 等级盲盒
        router.push("level-box")
    } else if (item.dataType == 3) {
        // 时间盲盒
        router.push("time-box")
    } else if (item.dataType == 4) {
        // 推广盲盒
        router.push("promotion-box")
    } else if (item.dataType == 5) {
        // 幸运盲盒
        // router.push("lucky")
    } else if (item.dataType == 9) {
        // 汰换合约
        router.push("exchange")
    }
}

function itemBg(data: string) {
    return 'background-image: url(https://95-csgo.oss-cn-beijing.aliyuncs.com/' + eval('(' + data + ')').base + eval('(' + data + ')').mSmallBack + ');'
}

</script>

<template>
    <div id="history-list">
        <Swiper :modules="modules" :space-between="10" :slides-per-view="3" :speed="4000" :autoplay="{ delay: 1000 }"
            :allow-touch-move="false" :loop="true">
            <SwiperSlide class="history-item" v-for="history, index in historyList" :key="index"
                :style="itemBg(history.imageData)" @click="clickHistoryItem(history)">
                <div class="skins">
                    <img :src="history.goodsIcon" alt="history.goodsName">
                </div>
                <div class="user">
                    <div class="avatar">
                        <AvatarFrame :avatar-url="history.userIcon" :frame-url="history.iconUrl" />
                    </div>
                    <p>{{ history.userName }}</p>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped lang="less">
#history-list {
    height: 130px;

    &:deep(.swiper-slide) {
        width: 236px;
        height: 130px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;

        .skins {
            width: 190px;
            height: 80px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .user {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;

            .avatar {
                width: 25px;
                height: 25px;
            }

            p {
                height: 25px;
                max-width: 180px;
                font-size: 16px;
                margin-left: 10px;
                line-height: 25px;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
            }
        }
    }
}
</style>