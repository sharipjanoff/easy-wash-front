<template>
  <div class="registration-page">
    <div class="registration-page__item">
      <registration-form
        v-if="!isOtp"
        :is-manager="false"
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
  </div>
</template>

<script setup>
import { reactive, ref, computed, markRaw, onBeforeMount } from 'vue'
import { authService } from '@/plugins/axios/http/auth'
import RegistrationForm from '@/components/common/RegistrationForm.vue'
import OtpForm from '@/components/common/OtpForm.vue'
import { useToast } from 'primevue/usetoast'
import router from '@/plugins/router'
import instance from '../plugins/axios'

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
  error: '',
})
const otp = reactive({
  code: '',
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
    await router.push('/login')
  } else {
    otp.error = `Ошибка - ${verifyOtpResponse?.data?.message}`
  }
  otp.loading = false
}

onBeforeMount(() => {
  delete instance.defaults.headers.common.Authorization
})
</script>

<style scoped lang="scss">
.registration-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7f8fa;
  overflow-y: scroll;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}
</style>
