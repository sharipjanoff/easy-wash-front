<template>
  <div class="login-page">
    <form class="login-form">
      <div class="registration-form__item">
        <label for="email">email</label>
        <input-text type="text" v-model="userData.email" id="email" />
      </div>
      <div class="registration-form__item">
        <label for="password">password</label>
        <input-text type="text" v-model="userData.password" id="password" />
      </div>
      <p-button @click="login">Send</p-button>
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
  password: null,
})

const login = () => {
  console.log(userData)
  router.push('/')
}
</script>

<style scoped lang="scss">
.login-page {
  width: 100vw;
  height: 100vh;

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .login-form__input {
      width: 300px;
    }
  }
}
</style>
