import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '../components/PaginaInicio.vue'
import TablaClientes from '../components/TablaClientes.vue'
import TablaTareas from '@/components//TablaTareas.vue'
import NotFound from '../components/NotFound.vue'
import TablaContactos from '../components/TablaContactos.vue'
import TablaProductos from '../components/TablaProductos.vue'

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
    path: '/tareas',
    name: 'tareas',
    component: TablaTareas
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: TablaContactos
  },
  {
    path: '/productos',
    name: 'productos',
    component: TablaProductos
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
