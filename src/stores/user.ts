import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { API } from '@/api/API'

export const useUserStore = defineStore('user', () => {
  const showLoginDialog = ref(false)
  const userInfo = ref({} as UserInfo)
  const isLogined = ref(false)

  // 获取用户信息
  function fetchUserInfo() {
    API.fetchUserInfo((result)=>{
      if (result.code == 200 && result.data) {
        userInfo.value.userId = result.data.id
        userInfo.value.userName = result.data.userName
        userInfo.value.email = result.data.email
        userInfo.value.mobile = result.data.mobile
        userInfo.value.invitationCode = result.data.invitationCode
        userInfo.value.myInvitationCode = result.data.ownerInvitation
        isLogined.value = true
      }
    })
  }

  // 获取用户信息
  function fetchUserDetail() {
    API.fetchUserDetail((result)=>{
      if (result.code == 200 && result.data) {
        userInfo.value.userId = result.data.id
        userInfo.value.mobile = result.data.mobile
        userInfo.value.goldBalance = result.data.accountBalance
        userInfo.value.bulletBalance = result.data.ammoBalance
        userInfo.value.nickName = result.data.nickName
        userInfo.value.avatarUrl = result.data.userIcon
        userInfo.value.frameUrl = result.data.iconUrl
        isLogined.value = true
      }
      console.log(userInfo)
    })
  }
  return { showLoginDialog, userInfo, isLogined, fetchUserInfo, fetchUserDetail }
})

interface UserInfo {
  userId: number
  userName: string
  email: string
  mobile: string
  invitationCode: string
  myInvitationCode: string
  nickName: string
  goldBalance: number
  bulletBalance: number
  avatarUrl: string
  frameUrl: string
}
