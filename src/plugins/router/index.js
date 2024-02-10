import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'List Page',
      component: () => import('@/pages/ListPage.vue'),
    },
    {
      path: '/login',
      name: 'Login Page',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/registration',
      name: 'Registration Page',
      component: () => import('@/pages/RegistrationPage.vue'),
    },
  ],
})

export default router
