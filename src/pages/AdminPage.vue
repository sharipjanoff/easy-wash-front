<template>
  <div class="admin-page">
    <div class="page-header">
      <h1 class="page-header__title">Админ панель</h1>
    </div>
    <div class="admin-page__item"></div>
    <div class="admin-page__item">
      <registration-form
        v-if="!isOtp"
        :is-manager="true"
        :error="registration.error"
        :loading="registration.loading"
        @send-request="createUser($event)"
      />
      <otp-form
        v-else
        :error="otp.error"
        :loading="otp.loading"
        @send-request="sendOtp($event)"
      />
    </div>
    <div class="admin-page__item">
      <car-body-form
        :error="carBody.error"
        :loading="carBody.loading"
        @send-request="createCarBody($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/stores/user'
import router from '@/plugins/router'
import { authService } from '@/plugins/axios/http/auth'
import { carsService } from '@/plugins/axios/http/cars'
import RegistrationForm from '@/components/common/RegistrationForm.vue'
import OtpForm from '@/components/common/OtpForm.vue'
import CarBodyForm from '@/components/admin/CarBodyForm.vue'

const userStore = useUserStore()
const registration = reactive({
  userData: {
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    password: null,
    passwordConfirm: null,
    id: null,
  },
  loading: false,
  error: null,
})
const otp = reactive({
  code: '',
  loading: false,
  error: '',
})
const carBody = reactive({
  data: {
    type: null,
    ruName: null,
  },
  loading: false,
  error: '',
})
const isOtp = ref(false)
const toast = useToast()

const createUser = async data => {
  Object.assign(registration.userData, data)
  registration.loading = true

  const response = await authService.signUp(registration.userData)

  if (response?.data?.status === 2) {
    registration.error = `Ошибка при регистрации - ${response?.data?.message}`
    registration.loading = false
    return
  }
  const otpResponse = await authService.sendOtp(registration.userData)

  if (otpResponse?.data?.status === 1) {
    registration.userData.id = otpResponse?.data?.value
    isOtp.value = !isOtp.value
  }

  registration.loading = false
}
const sendOtp = async data => {
  otp.code = data
  otp.loading = true
  const verifyOtpResponse = await authService.verifyOtp({
    id: registration.userData.id,
    otp: otp.code,
  })
  if (verifyOtpResponse?.data?.status === 1) {
    toast.add({
      severity: 'success',
      summary: 'Упешно!',
      detail: `Пользователь "${registration.userData.email}" был создан`,
      life: 3000,
    })
    isOtp.value = !isOtp.value
  } else {
    otp.error = `Ошибка - ${verifyOtpResponse?.data?.message}`
  }
  otp.loading = false
}
const createCarBody = async data => {
  carBody.loading = true
  const createCarBodyResponse = await carsService.createCarBody(data)
  if (createCarBodyResponse?.data?.status === 1) {
    toast.add({
      severity: 'success',
      summary: 'Упешно!',
      detail: `Кузов "${data.ruName}" был создан`,
      life: 3000,
    })
  } else {
    carBody.error = `Ошибка! Кузов - ${data?.type} не был создан`
  }
  carBody.loading = false
}

onBeforeMount(() => {
  if (!userStore.data.roles.includes('ADMIN')) {
    router.push('/')
  }
})
</script>

<style scoped lang="scss">
.admin-page {
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
  }
}
</style>
