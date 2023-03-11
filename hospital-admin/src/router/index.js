// ?1.固定路由的方式
// ?2.动态路由 后面实现
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

// *懒加载
// 登录相关
const Login = () => import('@/views/login/index.vue')

// 首页相关
const Home = () => import('@/views/home/index.vue')

// 预约相关
const RegisterList = () => import('@/views/register/list/index.vue')
const RegisterDuty = () => import('@/views/register/duty/index.vue')
const RegisterDoctor = () => import('@/views/register/doctor/index.vue')

// 科室相关
const SectionManage = () => import('@/views/section/manage/index.vue')
const SectionOne = () => import('@/views/section/one/index.vue')
const SectionTwo = () => import('@/views/section/two/index.vue')
const SectionDoctor = () => import('@/views/section/doctor/index.vue')

// 订单相关
const OrderList = () => import('@/views/order/list/index.vue')
const OrderPay = () => import('@/views/order/pay-order/index.vue')
const OrderRefund = () => import('@/views/order/refund/index.vue')

// 系统相关
const SystemUser = () => import('@/views/system/user/index.vue')
const SystemAdmin = () => import('@/views/system/admin/index.vue')
const SystemMenu = () => import('@/views/system/menu/index.vue')
const SystemRole = () => import('@/views/system/role/index.vue')
const SystemPatient = () => import('@/views/system/patient/index.vue')

// 医院相关
const HospitalBanner = () => import('@/views/hospital/banner/index.vue')
const HospitalNotice = () => import('@/views/hospital/notice/index.vue')
const HospitalNavigation = () => import('@/views/hospital/navigation/index.vue')
const HospitalArticle = () => import('@/views/hospital/article/index.vue')
const HospitalShare = () => import('@/views/hospital/share/index.vue')
const HospitalFeedback = () => import('@/views/hospital/feedback/index.vue')

const routes = [{
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register/list",
    name: "register-list",
    component: RegisterList
  },
  {
    path: "/register/duty",
    name: "register-duty",
    component: RegisterDuty
  },
  {
    path: "/register/doctor",
    name: "register-doctor",
    component: RegisterDoctor
  },
  {
    path: "/section/manage",
    name: "section-manage",
    component: SectionManage
  },
  {
    path: "/section/one",
    name: "section-one",
    component: SectionOne
  },
  {
    path: "/section/two",
    name: "section-two",
    component: SectionTwo
  },
  {
    path: "/section/doctor",
    name: "section-doctor",
    component: SectionDoctor
  },
  {
    path: "/order/list",
    name: "order-list",
    component: OrderList
  },
  {
    path: "/order/pay",
    name: "order-pay",
    component: OrderPay
  },
  {
    path: "/order/refund",
    name: "order-refund",
    component: OrderRefund
  },
  {
    path: "/system/user",
    name: 'system-user',
    component: SystemUser
  },
  {
    path: "/system/role",
    name: 'system-role',
    component: SystemRole
  },
  {
    path: "/system/menu",
    name: 'system-menu',
    component: SystemMenu
  },
  {
    path: "/system/admin",
    name: 'system-admin',
    component: SystemAdmin
  },
  {
    path: "/system/patient",
    name: 'system-patient',
    component: SystemPatient
  },
  {
    path: "/hospital/banner",
    name: "hospital-banner",
    component: HospitalBanner
  },
  {
    path: "/hospital/notice",
    name: "hospital-notice",
    component: HospitalNotice
  },
  {
    path: "/hospital/article",
    name: "hospital-article",
    component: HospitalArticle
  },
  {
    path: "/hospital/nav",
    name: "hospital-nav",
    component: HospitalNavigation
  },
  {
    path: "/hospital/share",
    name: "hospital-share",
    component: HospitalShare
  },
  {
    path: "/hospital/feedback",
    name: "hospital-feedback",
    component: HospitalFeedback
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
