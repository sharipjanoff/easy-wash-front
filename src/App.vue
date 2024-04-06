<template>
  <toast />
  <header-component :user-data="userStore.data" />
  <router-view />
  <footer-component :user-data="userStore.data" />
</template>

<script setup>
import { useUserStore } from './stores/user'
import Toast from 'primevue/toast'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import { onBeforeMount } from 'vue'
import router from './plugins/router'

const userStore = useUserStore()

onBeforeMount(async () => {
  const userStore = useUserStore()
  const dataLength = Object.keys(userStore.data).length
  const isAuthenticated = dataLength > 0 && !userStore?.data?.error

  if (!isAuthenticated) {
    await router.push('/login')
  }
})
</script>
