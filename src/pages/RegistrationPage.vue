<template>
  <div class="registration-page">
    <form class="registration-form">
      <div class="registration-form__item">
        <label for="email">email</label>
        <input-text type="text" v-model="userData.email" id="email" />
      </div>
      <div class="registration-form__item">
        <label for="firstName">first-name</label>
        <input-text type="text" v-model="userData.firstName" id="firstName" />
      </div>
      <div class="registration-form__item">
        <label for="lastName">lastname</label>
        <input-text type="text" v-model="userData.lastName" id="lastName" />
      </div>
      <div class="registration-form__item">
        <label for="password">password</label>
        <input-text type="text" v-model="userData.password" id="password" />
      </div>
      <div class="registration-form__item">
        <label for="passwordConfirm">password-confirm</label>
        <input-text
          type="text"
          v-model="userData.passwordConfirm"
          id="passwordConfirm"
        />
      </div>
      <p-button @click="register">Send</p-button>
    </form>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
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

  .registration-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .registration-form__input {
      width: 300px;
    }
  }
}
</style>
