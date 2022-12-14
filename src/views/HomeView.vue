<script setup lang="ts">
import { API, APIResult } from '@/api/API';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import HistoryList from '@/components/HistoryList.vue';

const router = useRouter()
// 滚动公告
const noticeText = ref("")
// banner图片
const bannerList = ref(<any>[])
// 盲盒列表
const boxList = ref(<any>[])

onMounted(() => {
    fetchNotice()
    fetchBannerList()
    fetchBoxList()
})

function fetchNotice() {
    API.fetchHomeNotice((result: APIResult) => {
        if (result.code == 200 && result.data) {
            noticeText.value = result.data.replace(/<[^>]+>/g, '')
        }
    })
}

function fetchBannerList() {
    API.fetchHomeBannerList((result: APIResult) => {
        if (result.code == 200 && result.data) {
            bannerList.value = result.data
        }
    })
}

function fetchBoxList() {
    API.fetchHomeBoxList((result: APIResult) => {
        if (result.code == 200 && result.data) {
            boxList.value = result.data
        }
    })
}

function clickBannerItem(redirectUrl: string) {

}

function clickBoxItem(boxId: number) {
    router.push({ name: "blind-box", query: { id: boxId } })
}

</script>

<template>
    <div id="home-view">
        <!-- 公告 -->
        <div class="notice-bar">
            <van-notice-bar :text="noticeText" left-icon="volume-o" color="white" />
        </div>

        <!-- 历史掉落 -->
        <HistoryList />

        <!-- banner轮播图 -->
        <div class="banner-list">
            <van-swipe autoplay="3000" indicator-color="white" lazy-render>
                <van-swipe-item v-for="banner, index in bannerList" :key="index">
                    <img :src="banner.url" @click="clickBannerItem(banner.redirectUrl)" alt="banner">
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 盲盒列表 -->
        <div class="box-list">
            <!-- 分组 -->
            <div class="section" v-for="section, sectionIndex in boxList" :key="sectionIndex">
                <!-- 标题 -->
                <div class="title">
                    {{ section.zoneName }}
                </div>
                <!-- 列表 -->
                <div class="list">
                    <!-- 盒子 -->
                    <div class="box" v-for="box, boxIndex in section.boxList" :key="boxIndex"
                        @click="clickBoxItem(box.id)">
                        <!-- 徽标-hot -->
                        <div class="badge-hot" v-show="box.hotStatus == 1">
                            <img src="@/assets/images/home/badge_hot.png" alt="hot">
                        </div>
                        <!-- 图片 -->
                        <div class="picture" :style="'background-image:url(' + box.imgUrl + ');'">
                            <img :src="box.goodsImgUrl" alt="box.boxName">
                        </div>
                        <!-- 价格 -->
                        <div class="price">
                            <img src="@/assets/images/common/icon_gold.png" alt="gold">
                            {{ box.price }}
                        </div>
                        <!-- 名称 -->
                        <p>{{ box.boxName }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
#home-view {
    min-height: calc(100vh - 500px);

    .notice-bar {
        height: 60px;
        padding: 10px 10px;

        &:deep(.van-notice-bar) {
            width: 100%;
            height: 100%;
            padding: 0 20px;
            background-color: #1d1f27;
            border-radius: 20px;
        }

        &:deep(.van-notice-bar__content) {
            font-size: 18px;
        }
    }

    .banner-list {
        margin: 0 auto;
        margin-top: 20px;
        width: 710px;
        height: 194px;
        padding: 13px 12px;
        background: url(@/assets/images/home/banner_box.png) no-repeat center;
        background-size: contain;

        &:deep(.van-swipe) {
            width: 686px;
            height: 168px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        &:deep(.van-swipe__indicators) {
            bottom: 8px;

            .van-swipe__indicator {
                width: 8px;
                height: 8px;
            }
        }
    }

    .box-list {
        margin-top: 20px;
        padding: 0 20px;

        .section {
            .title {
                margin: 60px auto 20px;
                width: 710px;
                height: 40px;
                box-sizing: border-box;
                background: url(@/assets/images/home/bg_title.png) no-repeat center;
                background-size: contain;
                font-family: titlefont;
                text-align: center;
                font-size: 40px;
                line-height: 30px;
            }

            .list {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin-bottom: 60px;

                .box {
                    width: 350px;
                    position: relative;
                    margin-top: 40px;

                    .badge-hot {
                        position: absolute;
                        top: 0px;
                        right: 36px;
                        width: 50px;
                        height: 70px;

                        img {
                            width: 100%;
                        }
                    }

                    .picture {
                        width: 100%;
                        height: 260px;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;

                        img {
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }

                    .price {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-top: 10px;
                        font-size: 32px;
                        font-weight: bold;
                        color: var(--main-orange-color);

                        img {
                            width: 60px;
                            height: 60px;
                        }
                    }

                    p {
                        text-align: center;
                        font-size: 26px;
                        font-weight: bold;
                        color: white;
                    }
                }
            }
        }
    }
}
</style>

