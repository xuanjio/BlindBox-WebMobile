<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TabBar from '@/components/TabBar.vue'
import SelectBox from '@/components/SelectBox.vue'
import SearchBar from '@/components/SearchBar.vue'
import { API } from '@/api/API'
import { useUserStore } from "@/stores/user"
import { text } from 'dom7'
const userStore = useUserStore()

const tabIndex = ref(0)
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const items = ref(<any>[])
// 所有ROLL房：all, 我的ROLL房：mine
var rollType = 'all'
// ROLL房状态 0：未开始，1：进行中，2：已结束
const rollStatusList = ref([
    { text: '进行中', code: 1 },
    { text: '未开始', code: 0 }
])
const rollStatus = ref({ text: '进行中', code: 1 })
const keyword = ref('')
var pageNum = 1
var pageSize = 4

onMounted(() => {
    refreshRollList()
})

function clickTabItem(index: number) {
    if (index == 0) {
        tabIndex.value = index
        rollType = 'all'
        rollStatusList.value = [
            { text: '进行中', code: 1 },
            { text: '未开始', code: 0 }
        ]
    } else if (userStore.isLogined) {
        tabIndex.value = index
        rollType = 'mine'
        rollStatusList.value = [
            { text: '进行中', code: 1 },
            { text: '已结束', code: 2 }
        ]
    } else {
        tabIndex.value = 0
        userStore.showLoginDialog = true
        return
    }
    rollStatus.value = { text: '进行中', code: 1 }
    refreshRollList()
}

function clickRollItem(id: number) {

}

function onLoad() {
    loading.value = true
    error.value = false
    API.fetchRollList(rollType, rollStatus.value.code, keyword.value, pageNum, pageSize, (result) => {
        loading.value = false
        if (result.code == 200 && result.data) {
            items.value = items.value.concat(result.data.rows)
            finished.value = result.data.rows == 0
        } else {
            error.value = true
        }
    })
}

function refreshRollList() {
    pageNum = 1
    items.value = []
    finished.value = false
    onLoad()
}

function loadMoreRollList() {
    pageNum += 1
    onLoad()
}

function skinsItemBg(data: string) {
    return 'background-image: url(https://95-csgo.oss-cn-beijing.aliyuncs.com/' + eval('(' + data + ')').base + eval('(' + data + ')').smallBack + ');'
}

function skinsImg(data: string) {
    return eval('(' + data + ')').iconUrl
}

</script>

<template>
    <div id="roll-view">
        <!-- 所有ROLL房|我的ROLL房 玩法介绍 -->
        <div class="switch">
            <TabBar :items="['所有ROLL房', '我的ROLL房']" :tab-index="tabIndex" @click-item="clickTabItem" />
            <div class="help">玩法介绍</div>
        </div>

        <!-- 状态筛选|搜索框 -->
        <div class="operation">
            ROLL房状态
            <SelectBox class="select" />
            <SearchBar class="search" @change="(text) => { keyword = text }" @search="refreshRollList" />
        </div>

        <!-- 列表 -->
        <van-list :loading="loading" :finished="finished" finished-text="- 没有更多了 -" :error="error"
            error-text="请求失败，点击重新加载" @load="loadMoreRollList">
            <div class="list-item" v-for="item, index in items" :key="index" @click="clickRollItem(item.id)">
                <div class="time">开奖时间:{{ item.timeEnd }}:00:00</div>
                <div class="name">
                    <img src="@/assets/images/roll/icon_official.png" v-if="item.type == 1" />
                    <img src="@/assets/images/roll/icon_anchor.png" v-else />
                    <span>{{ item.name }}</span>
                </div>
                <div class="skins">
                    <div class="skins-item" v-for="skins in item.goodsInfo" :style="skinsItemBg(skins)">
                        <img :src="skinsImg(skins)" />
                    </div>
                </div>
                <div class="data">
                    <div class="data-item">
                        <img src="@/assets/images/roll/icon_skins_num.png" />
                        饰品数量{{ item.goodsCount }}
                    </div>
                    <div class="data-item">
                        <img src="@/assets/images/roll/icon_user_num.png" />
                        参与人数{{ item.userCount }}
                    </div>

                    <div class="data-item">
                        <img src="@/assets/images/common/icon_gold.png" />
                        饰品总价值{{ item.goodsValue }}
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<style scoped lang="less">
#roll-view {
    min-height: calc(100vh - 500px);

    .switch {
        height: 80px;
        padding-top: 20px;
        border-bottom: var(--main-orange-color) solid 4px;
        position: relative;
        box-sizing: border-box;

        .help {
            color: var(--main-orange-color);
            font-size: 24px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .operation {
        height: 96px;
        padding: 20px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .select {
            width: 140px;
            height: 56px;
            margin-left: 20px;
        }

        .search {
            flex: 1;
            height: 56px;
            margin-left: 20px;

            &:deep(.btn) {
                width: 80px;
                height: 56px;
            }
        }
    }

    .list-item {
        width: 710px;
        height: 308px;
        background: url(@/assets/images/roll/bg_list_item.png) no-repeat center;
        background-size: contain;
        margin-bottom: 40px;
        margin-left: 20px;
        padding: 10px 20px;
        box-sizing: border-box;

        .time {
            color: var(--main-orange-color);
            text-align: right;
            font-size: 18px;
        }

        .name {
            height: 66px;
            display: flex;
            align-items: center;

            img {
                width: 228px;
                height: 66px;
            }

            span {
                font-size: 28px;
                color: white;
                font-family: titlefont;
                margin-left: -60px;
            }
        }

        .skins {
            height: 124px;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 20px;

            .skins-item {
                width: 206px;
                height: 124px;
                display: inline-block;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                margin-right: 26px;
                position: relative;

                img {
                    max-width: 74%;
                    max-height: 74%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }
        }

        .data {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;

            .data-item {
                flex: 1;
                display: flex;
                align-items: center;
                color: #DDD;
                font-size: 16px;
                word-break: keep-all;

                img {
                    height: 20px;
                    margin-right: 10px;
                }

                &:last-child {
                    color: var(--main-orange-color);

                    img {
                        height: 30px;
                        margin-right: 4px;
                    }
                }
            }
        }
    }
}
</style>