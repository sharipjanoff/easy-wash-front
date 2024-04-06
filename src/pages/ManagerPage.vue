<template>
  <div class="manager-page">
    <div class="page-header">
      <h1 class="page-header__title">Менеджерская панель</h1>
    </div>
    <div class="manager-page__item">
      <form class="create-form">
        <div class="create-form__item">
          <h2>Создание автомойки</h2>
        </div>
        <div class="create-form__item">
          <input-float v-model="carWashData.name" id="name" label="Название" />
        </div>
        <div class="create-form__item">
          <input-float
            v-model="carWashData.location"
            id="location"
            label="Адрес"
          />
        </div>
        <div class="create-form__item">
          <input-float v-model="carWashData.lon" id="lon" label="Долгота" />
        </div>
        <div class="create-form__item">
          <input-float v-model="carWashData.lat" id="lat" label="Широта" />
        </div>
        <div class="create-form__item">
          <input-float
            v-model="carWashData.phone"
            id="phone"
            label="Номер телефона"
          />
        </div>
        <div class="create-form__item">
          <input-float
            v-model="carWashData.description"
            id="description"
            label="Описание"
          />
        </div>
        <div class="create-form__item">
          <p-button
            @click="button.action"
            :disabled="button.disabled"
            :loading="button.loading"
          >
            Создать
          </p-button>
          <p class="error" v-if="button.error.length > 0">{{ button.error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, markRaw, onBeforeMount, reactive } from 'vue'
import router from '@/plugins/router'
import { useUserStore } from '@/stores/user'
import { carsService } from '@/plugins/axios/http/cars'
import InputFloat from '@/components/common/InputFloat.vue'
import PButton from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const toast = useToast()
const carWashData = reactive({
  name: null,
  location: null,
  lon: null,
  lat: null,
  phone: null,
  description: null,
})
const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(carWashData).slice(0, -2)
    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }
    if (!validatePhone(carWashData.phone)) {
      button.error = 'Телефон должен начинаться с +7, 77 или 87'
      return true
    }
    button.error = ''
    return false
  }),
  action: markRaw(async () => {
    button.loading = true
    if (button.disabled) {
      console.error('Validation failed:', button.error)
      return
    }
    const createResponse = carsService.createWashingCenter(carWashData)
    if (createResponse?.data?.status === 2) {
      button.error = `Ошибка при регистрации - ${createResponse?.data?.message}`
      button.loading = false
      return
    } else {
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Автомойка "${carWashData.name}" была создана!`,
        life: 3000,
      })
    }
    button.loading = false
  }),
})

const validatePhone = phone => {
  return (
    phone &&
    (phone.startsWith('+7') || phone.startsWith('77') || phone.startsWith('87'))
  )
}

onBeforeMount(() => {
  if (!userStore.data.roles.includes('EMPLOYEE')) {
    router.push('/')
  }
})
</script>

<style scoped lang="scss">
.manager-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px 25px 75px 25px;
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

    .create-form {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 21px;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        .error {
          color: #a20000;
        }
      }
    }
  }
}
</style>
