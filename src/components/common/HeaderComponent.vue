<template>
  <header class="header" v-if="!isMobile">
    <div class="header__left">
      <sidebar-component />
      <router-link class="link" to="/">EasyWash</router-link>
    </div>
    <div class="header__right">
      <router-link class="link" to="/login">Login</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue'

const viewportWidth = window.innerWidth
const isMobile = ref(viewportWidth < 650)
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  width: 100%;
  background: aliceblue;

  &__left,
  &__right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  &__left {
    gap: 20px;
    margin-left: 20px;
  }

  &__right {
    margin-right: 20px;
  }
}
</style>
