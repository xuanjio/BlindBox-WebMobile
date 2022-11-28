<script setup lang="ts">
import { ref, type ComputedRef, type Ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useUserStore } from './stores/user'
import AvatarFrame from '@/components/AvatarFrame.vue'
import SideMenu from '@/components/SideMenu.vue'
import SideUser from '@/components/SideUser.vue'
import SideBar from '@/components/SideBar.vue'
import ViewFooter from '@/components/ViewFooter.vue'
import SignInBox from "@/components/SignInBox.vue";
import SignUpBox from "@/components/SignUpBox.vue";
import ResetPasswordBox from "@/components/ResetPasswordBox.vue";

const route = useRoute()
const userStore = useUserStore()
const showSideMenu = ref(false)
const showSideUser = ref(false)
const showSignUp = ref(false)
const showResetPassword = ref(false)
 
function toggleSideMenu() {
  showSideMenu.value = !showSideMenu.value
}

function toggleSideUser() {
  showSideUser.value = !showSideUser.value
  showSideMenu.value = false
}

</script>

<template>
  <!-- 头部导航条 -->
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
      <div class="sign" v-if="!userStore.isLogined">
        <p @click="userStore.showLoginDialog = true">登录</p>
        <p @click="showSignUp = true">注册</p>
      </div>
      <!-- 登录用户信息 -->
      <div class="user" v-if="userStore.isLogined">
        <!-- 金币-子弹 -->
        <div class="data">
          <!-- 金币余额 -->
          <div class="blance">
            <img src="./assets/images/common/icon_gold.png" alt="" />
            {{ userStore.userInfo.goldBalance }}
          </div>
          <!-- 弹药余额 -->
          <div class="blance">
            <img src="./assets/images/common/icon_bullet.png" alt="" />
            {{ userStore.userInfo.bulletBalance }}
          </div>
        </div>
        <!-- 头像 -->
        <div class="avatar" @click="toggleSideUser">
          <!-- 头像头像框 -->
          <AvatarFrame :avatar-url="userStore.userInfo.avatarUrl" :frame-url="userStore.userInfo.frameUrl" />
          <!-- 未读消息红点 -->
          <div class="unreaded"></div>
        </div>
      </div>
    </div>

  </div>

  <!-- 路由页面容器 -->
  <div id="container">
    <RouterView />
    <ViewFooter />
  </div>

  <!-- 左侧边页面导航栏 -->
  <div id="popup-menu">
    <van-popup v-model:show="showSideMenu" :style="{ width: '55%', height: '100%' }" position="left"
      :overlay-style="{ background: 'none' }">
      <SideMenu @hide="showSideMenu = false" />
    </van-popup>
  </div>

  <!-- 右侧边用户导航栏 -->
  <div id="popup-user">
    <van-popup v-model:show="showSideUser" :style="{ width: '55%', height: '100%' }" position="right"
      :overlay-style="{ background: 'none' }">
      <SideUser @hide="showSideUser = false" />
    </van-popup>
  </div>

  <!-- 右侧边工具栏 -->
  <SideBar />

  <!-- 登录 -->
  <div class="sign-dialog">
    <van-dialog v-model:show="userStore.showLoginDialog" :show-confirm-button=false>
      <SignInBox @close="userStore.showLoginDialog = false" @to-register="showSignUp = true" @to-reset-password="showResetPassword = true" />
    </van-dialog>
  </div>

  <!-- 注册 -->
  <div class="sign-dialog">
    <van-dialog v-model:show="showSignUp" :show-confirm-button=false>
      <SignUpBox @close="showSignUp = false" @to-login="userStore.showLoginDialog = true" />
    </van-dialog>
  </div>

  <!-- 重置密码 -->
  <div class="sign-dialog">
    <van-dialog v-model:show="showResetPassword" :show-confirm-button=false>
      <ResetPasswordBox @close="showResetPassword = false" @to-login="userStore.showLoginDialog = true" />
    </van-dialog>
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

.sign-dialog:deep(.van-dialog) {
  background: none;
  border-radius: 0;
  top: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 路由页面容器
#container {
  background: url(./assets/images/common/bg_page.png) no-repeat top var(--main-gray-color);
  background-size: 100%;
  margin-top: 100px;
  min-height: calc(100vh - 100px);
}
</style>
