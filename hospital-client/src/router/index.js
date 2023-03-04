import React from 'react'
import { Navigate } from 'react-router-dom'

// 首页相关
const Home=React.lazy(()=>import('@/views/home'))

// 登录相关
const Login = React.lazy(()=>import('@/views/login'))

const routes=[
  {
    path:'/',
    element:<Navigate to='/home'></Navigate>
  },
  {
    path:'/home',
    element:<Home></Home>
  },
  {
    path:'/login',
    element:<Login></Login>
  }
]

export default routes