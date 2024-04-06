<template>
  <div class="registration-page">
    <form v-if="!isOtp" class="registration-form">
      <div class="registration-form__item">
        <h1>Регистрация</h1>
        <h2>Заполните форму</h2>
      </div>
      <div class="registration-form__item">
        <input-float v-model="userData.email" id="email" label="Почта" />
      </div>
      <div class="registration-form__item">
        <input-float v-model="userData.firstName" id="firstName" label="Имя" />
      </div>
      <div class="registration-form__item">
        <input-float
          v-model="userData.lastName"
          id="lastName"
          label="Фамилия"
        />
      </div>
      <div class="registration-form__item">
        <input-float
          type="tel"
          v-model="userData.phone"
          id="phone"
          label="Телефон"
        />
      </div>
      <div class="registration-form__item">
        <input-float
          v-model="userData.password"
          id="password"
          label="Пароль"
          type="password"
        />
      </div>
      <div class="registration-form__item">
        <input-float
          v-model="userData.passwordConfirm"
          id="passwordConfirm"
          label="Подтвердите пароль"
          type="password"
        />
      </div>
      <div>
        Уже есть аккаунт?
        <span><router-link to="/login">Вход!</router-link></span>
      </div>
      <div class="registration-form__item">
        <p-button
          @click="button.action"
          :disabled="button.disabled"
          :loading="button.loading"
        >
          Зарегестрироваться
        </p-button>
        <p class="error" v-if="button.error.length > 0">{{ button.error }}</p>
      </div>
    </form>
    <div v-else class="otp">
      <div class="otp__item">
        <h2>Введите код отправленный вам на почту</h2>
        <v-otp-input
          ref="otpInput"
          v-model:value="otp.data"
          class="otp-input-container"
          input-classes="otp-input"
          separator=" "
          :num-inputs="4"
          :should-auto-focus="true"
          input-type="letter-numeric"
          :conditional-class="['one', 'two', 'three', 'four']"
          @keydown.enter="otpButton.action"
        />
        <p-button @click="otpButton.action" :disabled="otpButton.disabled">
          Отправить
        </p-button>
        <p class="error" v-if="otpButton.error.length > 0">
          {{ otpButton.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, markRaw } from 'vue'
import VOtpInput from 'vue3-otp-input'
import InputFloat from '@/components/common/InputFloat.vue'
import PButton from 'primevue/button'
import router from '@/plugins/router'
import { authService } from '@/plugins/axios/http/auth'

const userData = reactive({
  email: null,
  firstName: null,
  lastName: null,
  phone: null,
  password: null,
  passwordConfirm: null,
  id: null,
  type: null,
})
const isOtp = ref(false)
const otpInput = ref('')
const otp = reactive({
  data: '',
})
const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(userData).slice(0, -2)
    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }
    if (!validateEmail(userData.email)) {
      button.error = 'Введите корректный email'
      return true
    }
    if (!validatePhone(userData.phone)) {
      button.error = 'Телефон должен начинаться с +7, 77 или 87'
      return true
    }
    if (
      !validateNameAndSurname(userData.firstName) ||
      !validateNameAndSurname(userData.lastName)
    ) {
      button.error = 'Имя и фамилия должны содержать только буквы'
      return true
    }
    if (!validatePassword(userData.password)) {
      button.error =
        'Пароль должен содержать хотя бы одну строчную и заглавную букву, один спецсимвол (!@#$%^&*()-_=+) и одну цифру'
      return true
    }
    if (userData.password !== userData.passwordConfirm) {
      button.error = 'Пароли не совпадают'
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
    userData.type = 'CLIENT'
    const response = await authService.signUp(userData)
    if (response?.data?.status === 2 || !response) {
      button.error = `Ошибка при регистрации - ${
        response?.data?.message || 'сервис временно недоступен, попробуй позже'
      }`
      button.loading = false
      return
    }
    const otpResponse = await authService.sendOtp(userData)
    if (otpResponse?.data?.status === 1) {
      userData.id = otpResponse?.data?.value
      isOtp.value = !isOtp.value
    }
    button.loading = false
  }),
})
const otpButton = reactive({
  error: '',
  loading: false,
  action: markRaw(async () => {
    otpButton.loading = true
    const verifyOtpResponse = await authService.verifyOtp({
      id: userData.id,
      otp: otp.data,
    })
    if (verifyOtpResponse?.data?.status === 1) {
      router.push('/login')
    } else {
      otpButton.error = verifyOtpResponse?.data?.message
    }
    otpButton.loading = false
  }),
})

const validateEmail = email => {
  return email && email.includes('@')
}
const validatePhone = phone => {
  return (
    phone &&
    (phone.startsWith('+7') || phone.startsWith('77') || phone.startsWith('87'))
  )
}
const validateNameAndSurname = name => {
  return /^[a-zA-Zа-яА-ЯёЁ]+$/u.test(name)
}
const validatePassword = password => {
  const lowercase = /[a-z]/g
  const uppercase = /[A-Z]/g
  const number = /\d/g
  const special = /[!@#$%^&*()-_=+]/g
  return (
    lowercase.test(password) &&
    uppercase.test(password) &&
    number.test(password) &&
    special.test(password)
  )
}
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

  .registration-form,
  .otp {
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
</style>
