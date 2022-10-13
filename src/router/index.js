import VueRouter from "vue-router"
import Vue from 'vue'

import Landing from '../views/landing.vue'
import Home from '../views/homepage.vue'
import Login from '../views/login.vue'
import SignUp from '../views/signup.vue'
import Verification from '../views/verification.vue'
import Create from '../views/createWorkout.vue'
import Explore from '../views/explore.vue'
import Profile from '../views/profile.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Landing},
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/verification', component: Verification },
  { path: '/create', component: Create },
  { path: '/explore', component: Explore },
  { path: '/profile', component: Profile },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router