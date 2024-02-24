import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home Page',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/list',
      name: 'List Page',
      component: () => import('@/pages/ListPage.vue'),
    },
    {
      path: '/favorite',
      name: 'Favorite Page',
      component: () => import('@/pages/FavoritePage.vue'),
    },
    {
      path: '/schedule',
      name: 'Schedule Page',
      component: () => import('@/pages/SchedulePage.vue'),
    },
    {
      path: '/profile',
      name: 'Profile Page',
      component: () => import('@/pages/ProfilePage.vue'),
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
