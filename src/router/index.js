import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import TableLidersView from '../views/TableLidersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameView
    },
    {
      path: '/liders',
      name: 'lider',
      component: TableLidersView
    },
  ]
})

export default router
