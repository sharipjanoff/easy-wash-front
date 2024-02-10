<template>
  <header-component />
  <router-view />
  <sidebar-component />
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue'
</script>

<style scoped>
#app {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
}
.main {
  padding-top: 10px;
}
</style>
