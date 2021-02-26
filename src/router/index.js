import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-up',
    name: 'SignUp',
    component:  SignUp
  },
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
