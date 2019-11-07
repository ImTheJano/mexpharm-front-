import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import RegisterForm from './views/RegisterForm.vue'
import Settings from './views/Settings.vue'
import Data from './views/Data.vue'
import Export from './views/Export.vue'
import AfterForm from './views/AfterForm.vue'

Vue.use(Router)

const routes= [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Registro',
    component: RegisterForm
  },
  {
    path: '/data',
    name: 'Datos',
    component: Data
  },
  {
    path: '/settings',
    name: 'Cofiguración',
    component: Settings
  },
  {
    path: '/export',
    name: 'Exportar',
    component: Export
  },
  {
    path: '/about',
    name: 'Acerca de',
    component: About
  },
  {
    path: '/otro',
    name: 'Otro link',
    component: AfterForm
  },
]
const router=new Router({routes})
export {routes,router} 
