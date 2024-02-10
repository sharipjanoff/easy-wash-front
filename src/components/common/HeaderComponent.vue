<template>
  <header class="header">
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
import SidebarComponent from '@/components/common/SidebarComponent.vue'
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
    width: 30%;
  }
  &__right {
    width: 10%;
  }
}
</style>
