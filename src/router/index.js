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
import i18n from "@/locales";
import store from '@/store'
import SuccessPayment from "@/pages/SuccessPayment";
import ErrorPayment from "@/pages/ErrorPayment";
import {getIsUserAuth, setIsUserAuth, getIsTildaUser, setIsTildaUser} from "../helpers/defaultValues";

Vue.use(VueRouter)

const routes = [
  {
    path: '/user/:id',
    component: PersonalCab,
    children: [
      {path: 'user-data', component: UserData, name: 'UserData', meta: {title: i18n.t('message.pagesTitle.userData')}},
      {
        path: 'change-pass',
        component: ChangePass,
        name: 'ChangePass',
        meta: {title: i18n.t('message.pagesTitle.changePass')}
      },
      {
        path: 'change-fio',
        component: ChangeFIO,
        name: 'ChangeFIO',
        meta: {title: i18n.t('message.pagesTitle.changeFio')}
      },
      {
        path: 'order-cart',
        component: OrderCart,
        name: 'OrderCart',
        meta: {title: i18n.t('message.pagesTitle.orderCart')}
      },
      {path: 'verify', component: Verify, name: 'Verify', meta: {title: i18n.t('message.pagesTitle.verify')}},
      {path: '', component: MainPage, name: 'MainPage', meta: {title: i18n.t('message.pagesTitle.personalCab')}},
    ],
    meta: {
      auth: true,
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {title: i18n.t('message.pagesTitle.signUp')}
  },
  {
    path: '/forget-pass',
    name: 'ForgetPass',
    component: ForgetPath,
    meta: {title: i18n.t('message.pagesTitle.forgetPass')}
  },
  {
    path: '/success',
    name: 'SuccessPay',
    component: SuccessPayment,
    meta: {
      auth: true,
      title: i18n.t('message.pagesTitle.payment')
    }
  },
  {
    path: '/error',
    name: 'ErrorPay',
    component: ErrorPayment,
    meta: {
      auth: true,
      title: i18n.t('message.pagesTitle.errorPayment')
    }
  },
  {
    path: '/',
    name: 'LogIn',
    component: LogIn,
    meta: {title: i18n.t('message.pagesTitle.logIn')}
  },
  {
    path: '*',
    component: ErrorPage,
    meta: {title: i18n.t('message.pagesTitle.error')}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const tildaUserAllowPagesTo = ['UserData','ChangePass','ChangeFIO'];
const tildaUserAllowPagesFrom = ['LogIn', 'UserData','ChangePass','ChangeFIO']

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some(route => route.meta.auth);
  if (requiredAuth && (!getIsUserAuth() || getIsTildaUser())) {
    store.dispatch('fetchUser')
      .then((res) => {
        console.log('ROUTER FETCH USER');
        if (res) {
          setIsUserAuth(true);
          const fromAllow = tildaUserAllowPagesFrom.filter(name => name === from.name);
          const toAllow = tildaUserAllowPagesTo.filter(name => name === to.name);
          setIsTildaUser(store.state.user.tildaUser);
          const userId = store.state.user.id;
          if (getIsTildaUser()) {
            if (fromAllow.length === 0 && toAllow.length === 0) {
              next(`/user/${userId}/user-data`)
              return;
            }
            if(fromAllow.length === 0 && toAllow.length !== 0){
              next();
              return;
            }
            if(fromAllow.length !== 0 && toAllow.length === 0){
              next(false)
              return;
            }
            if (fromAllow.length !== 0 && toAllow.length !== 0){
              next();
            }
          }
          else {
            next()
          }
        } else {
          next('/')
        }
      })
      .catch(() => {
      })
  } else {
    next()
  }
})


export default router
