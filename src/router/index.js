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
import ErrorPage from "@/pages/ErrorPage";

import store from '@/store'
import SuccessPayment from "../pages/SuccessPayment";



Vue.use(VueRouter)

const routes = [
  {
    path: '/user/:id',
    component: PersonalCab,
    children: [
      {path: 'user-data', component: UserData, name: 'UserData', meta:{title: 'Личный кабинет - Персональная информация'}},
      {path: 'change-pass', component: ChangePass, name: 'ChangePass', meta:{title: 'Личный кабинет - Изменить пароль'}},
      {path: 'change-fio', component: ChangeFIO, name: 'ChangeFIO', meta:{title: 'Личный кабинет - Изменить ФИО'}},
      {path: 'order-cart', component: OrderCart, name: 'OrderCart', meta:{title: 'Личный кабинет - Оформить заказ'}},
      {path: 'verify', component: Verify, name: 'Verify', meta:{title: 'Личный кабинет - Подтверждение статуса'}},
      {path: '', component: MainPage, name: 'MainPage', meta:{title: 'Личный кабинет'}},
    ],
    meta: {
      auth: true,
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta:{title: 'Регистрация'}
  },
  {
    path: '/forget-pass',
    name: 'ForgetPass',
    component: ForgetPath,
    meta:{title: 'Забыли пароль'}
  },
  {
    path: '/success',
    name: 'SuccessPay',
    component: SuccessPayment,
    meta:{
      auth: true,
      title: 'Успешная оплата'
    }
  },
  {
    path: '/',
    name: 'LogIn',
    component: LogIn,
    meta:{title: 'Авторизация'}
  },
  {
    path: '*',
    component: ErrorPage,
    meta:{title: 'Страница не найдена'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
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
