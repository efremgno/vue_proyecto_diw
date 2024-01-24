import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '../components/PaginaInicio.vue'
import TablaClientes from '../components/TablaClientes.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
