import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from "@/pages/LogIn";
import SignUp from "@/pages/SignUp";
import PersonalCab from "@/pages/PersonalCab";
import ForgetPath from "@/pages/ForgetPass";

Vue.use(VueRouter)

const routes = [
  {
    path: '/lk/:id',
    name: 'PersonalCabinet',
    component: PersonalCab
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component:  SignUp
  },
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/forget-pass',
    name: 'ForgetPass',
    component: ForgetPath
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
