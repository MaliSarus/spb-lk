import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from "@/pages/LogIn";
import SignUp from "@/pages/SignUp";
import PersonalCab from "@/pages/PersonalCab";
import ForgetPath from "@/pages/ForgetPass";
import UserData from "@/pages/UserData";
import MainPage from "@/components/PersonalCab/MainPage/MainPage";
import ChangePass from "@/pages/ChangePass";
import ChangeFIO from "@/pages/ChangeFIO";
import OrderCart from "@/pages/OrderCart";
import Verify from "@/pages/Verify";

import store from '@/store'



Vue.use(VueRouter)

const routes = [
  {
    path: '/lk/:id',
    component: PersonalCab,
    children: [
      {path: 'user-data', component: UserData, name: 'UserData'},
      {path: 'change-pass', component: ChangePass, name: 'ChangePass'},
      {path: 'change-fio', component: ChangeFIO, name: 'ChangeFIO'},
      {path: 'order-cart', component: OrderCart, name: 'OrderCart'},
      {path: 'verify', component: Verify, name: 'Verify'},
      {path: '', component: MainPage, name: 'MainPage'},
    ],
    meta: {
      auth: true,
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/forget-pass',
    name: 'ForgetPass',
    component: ForgetPath
  },
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some(route => route.meta.auth);
  if (requiredAuth) {
    store.dispatch('fetchUser')
      .then((res) => {
        console.log(res)
        if (res){
          next()
        }
        else{
          next('/')
        }
      })
  }
  else{
    next()
  }
})

export default router
