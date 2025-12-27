import { createRouter, createWebHashHistory } from 'vue-router'

import VisualizerPage from '../pages/visualizer/VisualizerPage.vue'
import Tab1Page from '../pages/tab1/Tab1Page.vue'
import Tab2Page from '../pages/tab2/Tab2Page.vue'
import SettingsPage from '../pages/settings/SettingsPage.vue'
import AboutPage from '../pages/about/AboutPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/visualizer'
  },
  {
    path: '/visualizer',
    name: 'Visualizer',
    component: VisualizerPage
  },
  {
    path: '/tab1',
    name: 'Tab1',
    component: Tab1Page
  },
  {
    path: '/tab2',
    name: 'Tab2',
    component: Tab2Page
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/about/AboutPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
