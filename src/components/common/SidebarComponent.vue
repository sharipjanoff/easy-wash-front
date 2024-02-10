<template>
  <div class="sidebar-component">
    <div class="sidebar">
      <sidebar
        v-model:visible="visible"
        header="EasyWash"
        class="w-full md:w-20rem lg:w-30rem"
      >
        <div class="list">
          <div class="list__item">
            <i class="pi pi-home"></i>
            <router-link to="/" class="link">Home</router-link>
          </div>
          <div class="list__item">
            <i class="pi pi-calendar"></i>
            <router-link to="/" class="link">Schedule</router-link>
          </div>
          <div class="list__item">
            <i class="pi pi-heart"></i>
            <router-link to="/" class="link">Favorites</router-link>
          </div>
          <div class="list__item">
            <i class="pi pi-cog"></i>
            <router-link to="/" class="link">Admin Panel</router-link>
          </div>
        </div>
        <div class="link">Logout</div>
      </sidebar>
    </div>
    <img
      class="sidebar-component__image"
      :src="burgerSvg"
      alt="Burger Menu Image"
      @click="visible = true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from 'primevue/sidebar'
import burgerSvg from '@/assets/icons/burger.svg'

const visible = ref(false)
</script>

<style scoped lang="scss">
.sidebar-component {
  &__image {
    cursor: pointer;
  }
}

.list {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;

    height: 40px;
    width: 100%;
    border-bottom: 1px #838a8c solid;

    p {
      font-size: 20px;
    }
  }
}
</style>
