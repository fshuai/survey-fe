import Vue from 'vue'
import VueRouter from 'vue-router'
import MyHome from '@/components/MyHome'
import MyUsers from '@/components/menus/MyUsers'
import MyUserDetail from '@/components/menus/MyUserDetail'
import MyLogin from '@/components/MyLogin'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: MyLogin },
  {
    path: '/home',
    component: MyHome,
    redirect: '/home/users',
    children: [
      { path: 'users', component: MyUsers },
      { path: 'userinfo/:id', component: MyUserDetail, props: true }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
