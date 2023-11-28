import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'List Page',
      component: () => import('@/pages/ListPage.vue'),
    },
  ],
})

export default router
