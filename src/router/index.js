import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import PersonalCab from "../components/PersonalCab";

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
