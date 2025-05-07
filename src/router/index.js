// filepath: /C:/Users/joyce/saloncito/harajukuFront/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Appointment from '../views/Appointment.vue'
import Gallery from '../views/Gallery.vue'
import Location from '../views/Location.vue'

import TipoServicios from '../views/components/TipoServicios.vue'

const routes = [
  {
    path: '/',
    redirect: '/about'
  },
  { path: '/about', name: 'About', component: About },
  { path: '/services', name: 'Services', component: Services },
  { 
    path: '/services/verCotizacion', 
    name: 'TipoServicios', 
    component: TipoServicios, // cliente y administrador ven la misma ruta
  },
  { path: '/appointment', name: 'Appointment', component: Appointment },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/location', name: 'Location', component: Location },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router