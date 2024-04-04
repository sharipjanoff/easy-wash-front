<template>
  <toast />
  <header-component :user-data="userStore.data" />
  <router-view />
  <footer-component />
</template>

<script setup>
import { useUserStore } from './stores/user'
import Toast from 'primevue/toast'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import { onBeforeMount } from 'vue'
import { authService } from './plugins/axios/http/auth'
import router from './plugins/router'

const userStore = useUserStore()

onBeforeMount(async () => {
  const currentUser = await authService.getCurrentUser()
  userStore.data = currentUser.data

  const isAuthenticated = !userStore?.data.error
  if (!isAuthenticated) {
    await router.push('/login')
  }
})
</script>
