import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { authService } from '../axios/http/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home Page',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/map',
      name: 'List Page',
      component: () => import('@/pages/MapPage.vue'),
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
      path: '/profile/payment',
      name: 'Payment Page',
      component: () => import('@/pages/PaymentPage.vue'),
    },
    {
      path: '/profile/cars',
      name: 'Cars Page',
      component: () => import('@/pages/CarsPage.vue'),
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
    {
      path: '/reservation',
      name: 'Reservation Page',
      component: () => import('@/pages/ReservationPage.vue'),
    },
    {
      path: '/admin',
      name: 'Admin Page',
      component: () => import('@/pages/AdminPage.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()

  const isAuthenticated = !userStore?.data.error
  if (!isAuthenticated && to.name !== 'Login Page') {
    await router.push('/login')
  }
})

export default router
