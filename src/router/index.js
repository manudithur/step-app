import VueRouter from "vue-router"
import Vue from 'vue'

import Landing from '../views/landing.vue'
import Home from '../views/homepage.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Landing},
  { path: '/home', component: Home },
  { path: '/login', component: Login },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router