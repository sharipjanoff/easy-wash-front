<template>
  <div class="registration-page">
    <form class="registration-form">
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
        Already have a profile?
        <span><router-link to="/login">Login!</router-link></span>
      </div>
      <p-button @click="register">Sign Up</p-button>
    </form>
  </div>
</template>

<script setup>
import InputFloat from '@/components/common/InputFloat.vue'
import PButton from 'primevue/button'
import { reactive } from 'vue'
import router from '../plugins/router'

//  firstname lastname picture mail password
const userData = reactive({
  email: null,
  firstName: null,
  lastName: null,
  password: null,
  passwordConfirm: null,
})

const register = () => {
  console.log(userData)
  router.push('/login')
}
</script>

<style scoped lang="scss">
.registration-page {
  width: 100vw;
  height: 100vh;
  padding-top: 25px;

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
}
</style>
