import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue')
const RollView = () => import('@/views/RollView.vue')
const ExchangeView = () => import('@/views/ExchangeView.vue')
const LevelBoxView = () => import('@/views/LevelBoxView.vue')
const TimeBoxView = () => import('@/views/TimeBoxView.vue')
const PromotionBoxView = () => import('@/views/PromotionBoxView.vue')
const MallView = () => import('@/views/MallView.vue')
const BattleView = () => import('@/views/BattleView.vue')
const LuckyView = () => import('@/views/LuckyView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const KnapsackView = () => import('@/views/KnapsackView.vue')
const RechargeView = () => import('@/views/RechargeView.vue')
const UserDataView = () => import('@/views/UserDataView.vue')
const PromotionView = () => import('@/views/PromotionView.vue')
const MessageView = () => import('@/views/MessageView.vue')
const TaskView = () => import('@/views/TaskView.vue')
const DownloadView = () => import('@/views/DownloadView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title:'skins'
      }
    },
    {
      path: '/roll',
      name: 'roll',
      component: RollView,
      meta: {
        title:'ROLL房'
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: ExchangeView,
      meta: {
        title:'汰换合约'
      }
    },
    {
      path: '/level-box',
      name: 'level-box',
      component: LevelBoxView,
      meta: {
        title:'等级盲盒'
      }
    },
    {
      path: '/time-box',
      name: 'time-box',
      component: TimeBoxView,
      meta: {
        title:'时间盲盒'
      }
    },
    {
      path: '/promotion-box',
      name: 'promotion-box',
      component: PromotionBoxView,
      meta: {
        title:'推广盲盒'
      }
    },
    {
      path: '/mall',
      name: 'mall',
      component: MallView,
      meta: {
        title:'弹药商城'
      }
    },
    {
      path: '/battle',
      name: 'battle',
      component: BattleView,
      meta: {
        title:'欧皇对战'
      }
    },
    {
      path: '/lucky',
      name: 'lucky',
      component: LuckyView,
      meta: {
        title:'幸运好礼'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        title:'个人资料'
      }
    },
    {
      path: '/knapsack',
      name: 'knapsack',
      component: KnapsackView,
      meta: {
        title:'我的背包'
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: RechargeView,
      meta: {
        title:'账户充值'
      }
    },
    {
      path: '/user-data',
      name: 'user-data',
      component: UserDataView,
      meta: {
        title:'个人明细'
      }
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: PromotionView,
      meta: {
        title:'推广分红'
      }
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView,
      meta: {
        title:'站内信息'
      }
    },
    {
      path: '/task',
      name: 'task',
      component: TaskView,
      meta: {
        title:'活动任务'
      }
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadView,
      meta: {
        title:'APP下载'
      }
    },
  ]
})

export default router
