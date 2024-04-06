<template>
  <div class="login-page">
    <form class="login-form">
      <h1>Вход</h1>
      <div class="login-form__item">
        <input-float
          id="email"
          label="Почта"
          v-model="userData.email"
          autocomplete="on"
        ></input-float>
      </div>
      <div class="login-form__item">
        <input-float
          id="password"
          label="Пароль"
          v-model="userData.password"
          type="password"
        ></input-float>
      </div>
      <div>
        Еще нет аккаунта?
        <span><router-link to="/registration">Создать!</router-link></span>
      </div>
      <div class="login-form__item">
        <p-button
          type="button"
          @click.prevent="button.action($event)"
          :disabled="button.disabled"
          :loading="button.loading"
        >
          Войти
        </p-button>
        <p class="error" v-if="button.error.length > 0">{{ button.error }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, markRaw, reactive, watchEffect, onBeforeMount } from 'vue'
import InputFloat from '@/components/common/InputFloat.vue'
import PButton from 'primevue/button'
import router from '@/plugins/router'
import { authService } from '@/plugins/axios/http/auth'
import instance from '../plugins/axios'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userData = reactive({
  email: null,
  password: null,
})

const button = reactive({
  loading: false,
  error: '',
  action: markRaw(async e => {
    e.preventDefault()
    button.loading = true
    const response = await authService.signIn(userData)
    if (response?.data?.status === 2 || !response) {
      button.error = `Ошибка при авторизации - ${
        response?.data?.message || 'сервис временно недоступен, попробуй позже'
      }`
      button.loading = false
      return
    }
    if (response?.data?.access_token) {
      localStorage.setItem('token', response?.data?.access_token)
      instance.defaults.headers.common.Authorization = `Bearer ${response?.data?.access_token}`
      const currentUser = await authService.getCurrentUser()
      userStore.data = currentUser.data
      router.push('/')
    }
    button.loading = false
  }),
})

onBeforeMount(() => {})
</script>

<style scoped lang="scss">
.login-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7f8fa;
  overflow-y: scroll;

  .login-form {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 21px;
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
  }

  .error {
    color: red;
  }
}
</style>
