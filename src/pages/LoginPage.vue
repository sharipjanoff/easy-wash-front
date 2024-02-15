<template>
  <div class="login-page">
    <form class="login-form">
      <div class="login-form__item">
        <input-float
          id="email"
          label="Email"
          v-model="userData.email"
        ></input-float>
      </div>
      <div class="login-form__item">
        <input-float
          id="password"
          label="Password"
          v-model="userData.password"
        ></input-float>
      </div>
      <div>
        Don't have a profile yet?
        <span
          ><router-link to="/registration"
            >Create and account</router-link
          ></span
        >
      </div>
      <p-button @click="login">Sign In</p-button>
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
  padding-top: 25px;

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 21px;
  }
}
</style>
