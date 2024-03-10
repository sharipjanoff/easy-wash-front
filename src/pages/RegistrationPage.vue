<template>
  <div class="registration-page">
    <h1>Регистрация</h1>
    <form v-if="!isOtp" class="registration-form">
      <h2>Заполните форму</h2>
      <div class="registration-form__item">
        <input-float v-model="userData.email" id="email" label="Email" />
      </div>
      <div class="registration-form__item">
        <input-float
          v-model="userData.firstName"
          id="firstName"
          label="First Name"
        />
      </div>
      <div class="registration-form__item">
        <input-float
          v-model="userData.lastName"
          id="lastName"
          label="Last Name"
        />
      </div>
      <div class="registration-form__item">
        <input-float
          v-model="userData.password"
          id="password"
          label="Password"
          type="password"
        />
      </div>
      <div class="registration-form__item">
        <input-float
          v-model="userData.passwordConfirm"
          id="passwordConfirm"
          label="Confirm password"
          type="password"
        />
      </div>
      <div>
        Уже есть аккаунт?
        <span><router-link to="/login">Вход!</router-link></span>
      </div>
      <p-button @click="register">Зарегестрироваться</p-button>
    </form>
    <div v-else class="otp">
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
        @keydown.enter="handleOnComplete"
      />
      <p-button @click="sendOtp">Отправить</p-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import VOtpInput from 'vue3-otp-input'
import InputFloat from '@/components/common/InputFloat.vue'
import PButton from 'primevue/button'
import router from '@/plugins/router'
import { authService } from '@/plugins/axios/http/auth'

//  firstname lastname picture mail password
const userData = reactive({
  email: null,
  firstName: null,
  lastName: null,
  password: null,
  passwordConfirm: null,
})
const isOtp = ref(false)
const otpInput = ref('')
const otp = reactive({
  data: '',
})

const register = async () => {
  const response = await authService.signUp(userData)
  console.log(response)
  isOtp.value = !isOtp.value
}
const handleOnComplete = () => {}
const sendOtp = () => {
  console.log('sent')
}
</script>

<style scoped lang="scss">
.registration-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .registration-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 21px;
    .registration-form__input {
      width: 300px;
    }
  }
  .otp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
}
</style>
