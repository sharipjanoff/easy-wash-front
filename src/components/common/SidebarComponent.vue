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
              <router-link to="/map" class="link" @click="visible = !visible"
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
          </div>
          <p-button class="button" @click="signOut"> Выйти </p-button>
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
import { onMounted, ref, watch } from 'vue'
import PButton from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import burgerSvg from '@/assets/icons/burger.svg'
import instance from '@/plugins/axios'
import router from '@/plugins/router'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  userData: {
    type: Object,
    required: false,
    default: null,
  },
})

const visible = ref(false)
const userStore = useUserStore()

const signOut = () => {
  visible.value = !visible.value
  localStorage.removeItem('token')
  userStore.reset()
  delete instance.defaults.headers.common.Authorization
  router.push('/login')
}
watch(props.userData, newData => {
  console.log(newData)
})
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
  text-align: center;
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
.button {
  align-self: center;
}
</style>
