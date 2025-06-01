// filepath: /C:/Users/joyce/saloncito/harajukuFront/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Appointment from '../views/Appointment.vue'
import Gallery from '../views/Gallery.vue'
import Location from '../views/Location.vue'
import { useToast } from "vue-toastification";
const toast = useToast();

import TipoServicios from '../views/components/TipoServicios.vue'
import Disponibilidad from '../views/components/Availability/Availability.vue'

const routes = [
  {
    path: '/',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  { path: '/about', name: 'About', component: About },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/services/TipoServicios', 
    name: 'TipoServicios', 
    component: TipoServicios, // cliente y administrador ven la misma ruta
  },
  { 
    path: '/services/Disponibilidad', 
    name: 'Disponibilidad', 
    component: Disponibilidad, 
  },  
  {
    path: '/services/mis-cotizaciones',
    name: 'MisCotizaciones',
    component: () => import('../views/components/cotizaciones/QuotationList.vue'),
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import('../views/Appointment.vue'),
    meta: { requiresAuth: true }
  },
    {
    path: '/appointment/citas',
    name: 'Citas',
    component: () => import('../views/components/Citas/Citas.vue'),
  },
      {
    path: '/appointment/comprobantes',
    name: 'Comprobantes',
    component: () => import('../views/components/Comprobantes/Comprobantes.vue'),
  },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/location', name: 'Location', component: Location },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = !!localStorage.getItem('token')

  if (requiresAuth && !isAuthenticated) {
    toast.warning('Debes iniciar sesión para acceder a esta sección')
    next('/about')
  } else {
    next()
  }
})


export default router