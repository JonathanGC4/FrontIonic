import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import BienvenidoPage from '@/views/BienvenidoPage.vue';
import HomePage from '../views/HomePage.vue';
import RegistroArea from '../views/Administrador/RegistroAreas.vue'; 
import AdministradorView from '../views/Administrador/AdministradorView.vue';
import GestionEmpleados from '@/views/Administrador/GestionEmpleados.vue';

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
    path: '/bienvenido', 
    redirect: '/bienvenido/defaultLogin' 
  },
  {
    path: '/home/:login',
    component: HomePage
  },
  {
    path: '/administradorview',
    component: AdministradorView 
  },
  {
    path: '/registro-areas',
    component: RegistroArea 
  },
  {
    path: '/gestion-empleados',
    component: GestionEmpleados 
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;