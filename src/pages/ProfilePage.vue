<template>
  <div class="profile-page">
    <div class="page-header">
      <h1 class="page-header__title">Профиль</h1>
    </div>
    <div class="profile-page__item">
      <div class="image-container">
        <img
          v-tooltip="'Обновить фото профиля'"
          class="image-container__image"
          :class="{ image_active: !userStore.image }"
          :src="userImage"
          alt="Profile Picture"
          @click="handleClick"
        />
        <input
          type="file"
          ref="hiddenFileInput"
          style="display: none"
          @input="upload"
          accept="image/*"
        />
      </div>
      <h2>{{ userStore.data.fio }}</h2>
    </div>
    <div class="profile-page__item">
      <div class="menu">
        <router-link class="menu__item" to="/profile/payment">
          Оплата
          <i
            class="pi pi-angle-right"
            style="font-size: 1.5rem; color: #989898"
          ></i>
        </router-link>
        <router-link class="menu__item" to="/profile/payment">
          Машины
          <i
            class="pi pi-angle-right"
            style="font-size: 1.5rem; color: #989898"
          ></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VTooltip from 'primevue/tooltip'
import uploadImage from '@/assets/icons/add-profile.svg'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const hiddenFileInput = ref()
const userImage = ref(userStore.data.image ? userStore.data.image : uploadImage)

const upload = async evt => {
  const file = evt.target.files[0] // Get the selected file
  if (file && file.type.startsWith('image/')) {
    // Check if the file is an image
    const reader = new FileReader() // Create a new FileReader instance

    reader.onload = e => {
      userImage.value = e.target.result // Update the userImage ref with the base64 encoded string
    }

    reader.readAsDataURL(file) // Read the file and convert it to a base64 encoded string
  }
}

const handleClick = () => {
  hiddenFileInput.value.click()
}
</script>

<style scoped lang="scss">
.profile-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px 25px 75px 25px;
  background: #f7f8fa;

  .page-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    .image-container {
      width: 200px;
      height: 200px;
      border: 1px #838a8c solid;
      border-radius: 50%;
      pointer-events: none;

      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .image_active {
      cursor: pointer !important;
      pointer-events: initial !important;
    }
    .menu {
      width: 100%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      &__item {
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        color: #000;
        font-weight: 600;
        font-size: 24px;
      }
      &__item:not(:last-child) {
        border-bottom: 1px #989898 solid;
      }
    }
  }
}
</style>
