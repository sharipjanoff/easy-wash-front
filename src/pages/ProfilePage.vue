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
        <router-link class="menu__item" to="/profile/cars">
          Машины
          <i
            class="pi pi-angle-right"
            style="font-size: 1.5rem; color: #989898"
          ></i>
        </router-link>
        <div class="menu__item" @click="changeUserDataForm.visible = true">
          Изменить данные профиля
          <i
            class="pi pi-angle-right"
            style="font-size: 1.5rem; color: #989898"
          ></i>
        </div>
        <div class="menu__item" @click="changePassword.visible = true">
          Изменить пароль
          <i
            class="pi pi-angle-right"
            style="font-size: 1.5rem; color: #989898"
          ></i>
        </div>
      </div>
    </div>
    <div class="dialogs">
      <Dialog
        v-model:visible="changePassword.visible"
        :modal="true"
        header="Изменить пароль"
        style="width: 50vw"
        :breakpoints="{ '1280px': '75vw', '960px': '85vw', '640px': '95vw' }"
      >
        <change-password-form
          :loading="changePassword.loading"
          :error="changePassword.error"
        />
      </Dialog>
      <Dialog
        v-model:visible="changeUserDataForm.visible"
        :modal="true"
        header="Изменить данные пользователя"
        style="width: 50vw"
        :breakpoints="{ '1280px': '75vw', '960px': '85vw', '640px': '95vw' }"
      >
        <change-user-data
          :data="changeUserDataForm.data"
          :loading="changeUserDataForm.loading"
          :error="changeUserDataForm.error"
        />
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { markRaw, onBeforeMount, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import VTooltip from 'primevue/tooltip'
import ChangePasswordForm from '@/components/profile/ChangePasswordForm.vue'
import ChangeUserData from '@/components/profile/ChangeUserDataForm.vue'
import uploadImage from '@/assets/icons/add-profile.svg'
import { fileService } from '../plugins/axios/http/file'
import { userService } from '../plugins/axios/http/user'

const toast = useToast()
const userStore = useUserStore()
const hiddenFileInput = ref()
const userImage = ref(userStore.data.image ? userStore.data.image : uploadImage)

const changEmailDialog = reactive({
  data: {},
  visible: false,
  loading: false,
  error: '',
})
const changePassword = reactive({
  data: {},
  visible: false,
  loading: false,
  error: '',
})
const changeUserDataForm = reactive({
  data: {},
  visible: false,
  loading: false,
  error: '',
})

const upload = async evt => {
  const file = evt.target.files[0]

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()

    reader.onload = e => {
      userImage.value = e.target.result
    }

    const uploadResponse = await fileService.uploadImage(file)
    if (uploadResponse?.data?.status === 1) {
      userStore.data.avatar = uploadResponse.data.value
      await userService.updateAvatar(uploadResponse.data.value)
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: 'Изображение было загружено!',
        life: 3000,
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Провал!',
        detail: 'Изображение не было загружено!',
        life: 3000,
      })
    }

    reader.readAsDataURL(file)
  }
}
const handleClick = () => {
  hiddenFileInput.value.click()
}

function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

function convertToImageSrc(buffer) {
  const base64String = arrayBufferToBase64(buffer)
  const mimeType = 'image/jpeg' // Change to the correct MIME type if needed
  return `data:${mimeType};base64,${base64String}`
}

onBeforeMount(async () => {
  if (userStore.data.avatar) {
    const imageResponse = await fileService.getImage(userStore.data.avatar)
    const imageData = imageResponse.data
    userImage.value = convertToImageSrc(imageData)
  }
})
</script>

<style scoped lang="scss">
.profile-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
  background: #f7f8fa;
  overflow-y: scroll;

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
        cursor: pointer;
      }
      &__item:not(:last-child) {
        border-bottom: 1px #989898 solid;
      }
    }
  }
}
</style>
