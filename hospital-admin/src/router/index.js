import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

// 登录相关
const Login = () => import('@/views/login/index.vue')

// 首页相关
const Home = () => import('@/views/home/index.vue')

const routes = [{
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/login",
    component: Login
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router