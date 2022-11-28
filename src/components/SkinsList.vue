<script setup lang="ts">
defineProps<{
    list: any[]
}>()

function itemBg(data: string) {
    return 'background-image: url(https://95-csgo.oss-cn-beijing.aliyuncs.com/' + eval('(' + data + ')').base + eval('(' + data + ')').wholeBack + ');'
}

function nameColor(data: string) {
    return 'color:' + eval('(' + data + ')').colorCode
}

</script>

<template>
    <div class="skins-list">
        <div class="item" v-for="item in list" :style="itemBg(item.imageData)">
            <!-- 图片 -->
            <div class="picture">
                <img :src="item.goodsImgUrl" :alt="item.goodsName" />
            </div>

            <!-- 名称 -->
            <div class="name" :style="nameColor(item.imageData)">
                {{ item.goodsName }}
            </div>

            <!-- 价格 -->
            <div class="price">
                <img src="@/assets/images/common/icon_gold.png" alt="gold" />
                {{ item.price.toFixed(2) }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.skins-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    box-sizing: border-box;

    .item {
        width: 220px;
        height: 262px;
        margin-bottom: 25px;
        margin-right: 25px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        position: relative;

        &:nth-child(3n) {
            margin-right: 0;
        }

        .picture {
            width: 180px;
            height: 180px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .name {
            text-align: center;
            padding: 0 10px;
            box-sizing: border-box;
            color: white;
            font-size: 16px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .price {
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--main-orange-color);
            font-size: 20px;
            margin-top: 15px;

            img {
                width: 28px;
                height: 28px;
            }
        }
    }
}
</style>