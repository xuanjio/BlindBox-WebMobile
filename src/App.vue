<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AvatarFrame from '@/components/AvatarFrame.vue'
import SideMenu from '@/components/SideMenu.vue'
import SideUser from '@/components/SideUser.vue'
import SideBar from '@/components/SideBar.vue'
import ViewFooter from '@/components/ViewFooter.vue'

const route = useRoute()
const navTitle = ref("skins")
const isLogined = ref(true)
const avatarUrl = ref("https://95-csgo.oss-cn-beijing.aliyuncs.com/usericon/2022-05-24/36a810538eeb462c8565253188929854.jpg")
const frameUrl = ref("https://95-csgo.oss-cn-beijing.aliyuncs.com/file/2022-05-16/6c8ed872da224f948ebe56b927f00bdd.png")
const blanceGold = ref(988.58)
const blanceBullet = ref(2000)
const showSideMenu = ref(false)
const showSideUser = ref(false)
const currentViewName = ref("home")

function toggleSideMenu() {
  showSideMenu.value = !showSideMenu.value
}

function toggleSideUser() {
  showSideUser.value = !showSideUser.value
  showSideMenu.value = false
}

</script>

<template>
  <!-- header -->
  <div id="header">
    <!-- 靠左 -->
    <div class="left">
      <!-- 菜单按钮 -->
      <div class="menu-btn" @click="toggleSideMenu">
        <img src="./assets/images/common/icon_menu.png" alt="" />
      </div>
      <!-- logo 标题 -->
      <div class="logo-title">
        <img src="./assets/images/common/icon_logo.png" alt="" />
        {{ route.meta.title }}
      </div>
    </div>
    <!-- 靠右 -->
    <div class="right">
      <!-- 登录 注册 -->
      <div class="sign" v-if="isLogined == false">
        <p>登录</p>
        <p>注册</p>
      </div>
      <!-- 登录用户信息 -->
      <div class="user" v-if="isLogined == true">
        <!-- 金币-子弹 -->
        <div class="data">
          <!-- 金币余额 -->
          <div class="blance">
            <img src="./assets/images/common/icon_gold.png" alt="" />
            {{ blanceGold }}
          </div>
          <!-- 弹药余额 -->
          <div class="blance">
            <img src="./assets/images/common/icon_bullet.png" alt="" />
            {{ blanceBullet }}
          </div>
        </div>
        <!-- 头像 -->
        <div class="avatar" @click="toggleSideUser">
          <!-- 头像头像框 -->
          <AvatarFrame :avatar-url="avatarUrl" :frame-url="frameUrl" />
          <!-- 未读消息红点 -->
          <div class="unreaded"></div>
        </div>
      </div>
    </div>

  </div>
  <!-- popup menu -->
  <div id="popup-menu">
    <van-popup v-model:show="showSideMenu" :style="{width:'55%',height:'100%'}" position="left" :overlay-style="{background:'none'}">
      <SideMenu @hide="showSideMenu = false"/>
    </van-popup>
  </div>
  <!-- popup user -->
  <div id="popup-user">
    <van-popup v-model:show="showSideUser" :style="{width:'55%',height:'100%'}" position="right" :overlay-style="{background:'none'}">
      <SideUser @hide="showSideUser = false"/>
    </van-popup>
  </div>
  <!-- side bar -->
  <SideBar />
  <!-- 路由页面容器 -->
  <div id="container">
    <RouterView />
    <ViewFooter />
  </div>
</template>

<style lang="less" scoped>
// 头部导航栏
#header {
  width: 100%;
  height: 100px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: var(--main-black-color);
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;

    .menu-btn {
      width: 68px;
      height: 68px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .logo-title {
      margin-left: 30px;
      display: flex;
      align-items: center;
      font-size: 36px;
      font-family: titlefont;

      img {
        width: 55px;
        height: 50px;
        margin-right: 20px;
      }
    }
  }

  .right {
    display: flex;

    .sign {
      display: flex;
      align-items: center;

      p {
        width: 120px;
        height: 60px;
        font-weight: bold;
        font-size: 26px;
        line-height: 60px;
        text-align: center;
        border-radius: 8px;

        &:first-child {
          border: var(--main-orange-color) solid 2px;
          color: var(--main-orange-color);
          margin-right: 20px;
        }

        &:last-child {
          background-color: var(--main-orange-color);
          color: var(--main-black-color);
        }
      }
    }

    .user {
      display: flex;
      align-items: center;

      .data {
        .blance {
          display: flex;
          align-items: center;
          color: var(--main-orange-color);
          font-size: 22px;
          font-weight: bold;

          img {
            width: 32px;
            height: 32px;
          }
          &:last-child {
            color: rgb(43, 188, 242); 
          }
        }
      }

      .avatar {
        position: relative;
        width: 64px;
        height: 64px;
        margin-left: 12px;

        .unreaded {
          position: absolute;
          left: 64px;
          top: 0px;
          width: 12px;
          height: 12px;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
}
#popup-menu:deep(.van-overlay) {
  z-index: 99 !important;
}
#popup-menu:deep(.van-popup) {
  z-index: 99 !important;
}

// 路由页面容器
#container {
  background: url(./assets/images/common/bg_page.png) no-repeat top var(--main-gray-color);
  background-size: 100%;
  min-height: calc(100vh - 100px);
  margin-top: 100px;
  position: relative;
}
</style>
