<template>
  <header class="header" v-if="!isMobile">
    <div class="header__left">
      <sidebar-component :user-data="userData" />
      <router-link class="logo" to="/">EasyWash</router-link>
    </div>
    <div class="header__right">
      <p-button
        @click="() => router.push('/admin')"
        v-if="userData?.roles?.includes('ADMIN')"
        >Админ панель</p-button
      >
      <p-button
        @click="() => router.push('/manager')"
        v-if="userData?.roles?.includes('EMPLOYEE')"
        >Менеджерская панель</p-button
      >
      <p-button @click="handleClick()" v-if="userData?.firstName">
        {{ userData.firstName }}
      </p-button>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue'
import PButton from 'primevue/button'
import router from '@/plugins/router'

const props = defineProps({
  userData: {
    type: Object,
    required: false,
    default: null,
  },
})
const viewportWidth = window.innerWidth
const isMobile = ref(viewportWidth < 650)
const handleClick = () => {
  router.push('/profile')
}

watch(props.userData, newData => {
  console.log(newData)
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  width: 100%;
  background: #f7f8fa;

  &__left,
  &__right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  &__left {
    gap: 20px;
    margin-left: 25px;

    .logo {
      font-size: 26px;
      line-height: 46px;
      letter-spacing: 0.7px;
      font-weight: 600;

      color: var(--primary-color);
      text-decoration: none;
    }
  }

  &__right {
    gap: 10px;
    margin-right: 25px;
  }
}
</style>
