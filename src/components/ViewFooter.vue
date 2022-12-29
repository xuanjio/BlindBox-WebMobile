<script setup lang="ts">
import { API } from "@/api/API";
import { ref, onMounted } from "vue";

const openNum = ref(0)
const regNum = ref(0)
const onlineNum = ref(0)

onMounted(() => {
    API.fetchStatisticalData((result) => {
        if (result.code == 200 && result.data) {
            openNum.value = result.data.openNum
            regNum.value = result.data.regNum
            onlineNum.value = result.data.onlineNum
        }
    })
})
</script>

<template>
    <div id="view-footer">
        <!-- 统计数据 -->
        <div class="statistical">
            <div class="data">
                <p>{{ openNum }}</p>
                <p>已开启盲盒总数</p>
            </div>
            <div class="data">
                <p>{{ regNum }}</p>
                <p>已注册人数</p>
            </div>
            <div class="data">
                <p>{{ onlineNum }}</p>
                <p>在线人数</p>
            </div>
        </div>
        <!-- 相关链接 -->
        <div class="links">
            <p>联系我们</p>
            <p>隐私政策</p>
            <p>用户协议</p>
            <p>常见问题</p>
            <p>相关教程</p>
            <p>合规声明</p>
        </div>
    </div>
</template>

<style scoped lang="less">
#view-footer {
    width: 100%;
    background: url(@/assets/images/common/line_footer.png) no-repeat top;
    background-size: contain;
    padding: 58px 0;

    .statistical {
        margin-top: 60px;
        display: flex;
        align-items: center;

        .data {
            flex: 1;
            text-align: center;
            position: relative;

            p {
                font-size: 16px;

                &:first-child {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 30px;
                }
            }

            &::after {
                display: block;
                content: "";
                width: 1px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                background-image: linear-gradient(rgba(255, 255, 255, 0.1), #CCC, rgba(255, 255, 255, 0.1));
            }

            &:last-child {
                &::after {
                    display: none;
                }
            }
        }
    }

    .links {
        margin-top: 60px;
        display: flex;
        justify-content: center;

        p {
            font-size: 16px;
            padding: 0 20px;
            border-left: 1px solid white;

            &:first-child {
                border-left: none;
            }
        }
    }
}
</style>