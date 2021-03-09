import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from "@/pages/LogIn";
import SignUp from "@/pages/SignUp";
import PersonalCab from "@/pages/PersonalCab";
import ForgetPath from "@/pages/ForgetPass";
import UserData from "@/pages/UserData";
import MainPage from "@/components/PersonalCab/MainPage/MainPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/lk/:id',
    name: 'PersonalCabinet',
    component: PersonalCab,
    children: [
      { path: 'user-data', component: UserData, name:'UserData' },
      { path: '', component: MainPage, name:'MainPage' },
    ]
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component:  SignUp
  },
  {
    path: '/forget-pass',
    name: 'ForgetPass',
    component: ForgetPath
  },
  {
    path: '/user-data',
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

export default router
