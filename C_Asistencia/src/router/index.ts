import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import BienvenidoPage from '@/views/BienvenidoPage.vue';
import HomePage from '../views/HomePage.vue';



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
    {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/bienvenido/:login',
    component: BienvenidoPage
  },
  {
    path: '/home/:login',
    component: HomePage
  },

  

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
