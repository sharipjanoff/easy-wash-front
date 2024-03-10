<template>
  <div class="sidebar-component">
    <div class="sidebar-container">
      <sidebar
        v-model:visible="visible"
        header="EasyWash"
        class="w-full md:w-20rem lg:w-30rem sidebar"
      >
        <div class="sidebar-content">
          <div class="list">
            <div class="list__item">
              <i class="pi pi-home" style="font-size: 1.5rem"></i>
              <router-link to="/" class="link" @click="visible = !visible"
                >Главная</router-link
              >
            </div>
            <div class="list__item">
              <i class="pi pi-calendar" style="font-size: 1.5rem"></i>
              <router-link
                to="/schedule"
                class="link"
                @click="visible = !visible"
                >Расписание</router-link
              >
            </div>
            <div class="list__item">
              <i class="pi pi-map-marker" style="font-size: 1.5rem"></i>
              <router-link to="/list" class="link" @click="visible = !visible"
                >Карта</router-link
              >
            </div>
            <div class="list__item">
              <i class="pi pi-heart" style="font-size: 1.5rem"></i>
              <router-link
                to="/favorite"
                class="link"
                @click="visible = !visible"
                >Избранное</router-link
              >
            </div>
            <div class="list__item">
              <i class="pi pi-user" style="font-size: 1.5rem"></i>
              <router-link
                class="link"
                to="/profile"
                @click="visible = !visible"
                >Профиль</router-link
              >
            </div>
            <div class="list__item" v-if="isAdmin">
              <i class="pi pi-cog" style="font-size: 1.5rem"></i>
              <router-link to="/" class="link" @click="visible = !visible"
                >Админ Панель</router-link
              >
            </div>
          </div>
          <router-link to="/login" class="link" @click="visible = !visible"
            >Выйти</router-link
          >
        </div>
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
const isAdmin = ref(false)
</script>

<style scoped lang="scss">
.sidebar-component {
  &__image {
    cursor: pointer;
  }
}
.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 20px 0;
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
