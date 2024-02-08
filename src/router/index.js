import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '../components/PaginaInicio.vue'
import TablaClientes from '../components/TablaClientes.vue'
import TablaArticulos from '../components/TablaArticulos.vue'
import TablaTareas from '@/components//TablaTareas.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PaginaInicio
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: TablaClientes
  },
  {
    path: '/articulos',
    name: 'articulos',
    component: TablaArticulos
  },
  {
    path: '/tareas',
    name: 'tareas',
    component: TablaTareas
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
