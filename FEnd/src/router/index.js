import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/views/HomeView.vue'
import SignUp from '../components/SignUp'
import SearchView from '../components/views/SearchView.vue'
import StatisticsView from '../components/views/StatisticsView.vue'
import LogIn from '../components/LogIn'
import QuaLify from '../components/views/QuaLify.vue'
import InfoView from '../components/views/InfoView.vue'
import FavoritesView from '../components/views/FavoritesView.vue'

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: SearchView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: StatisticsView
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/qualify',
    name: 'qualify',
    component: QuaLify
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  }
  ,
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
