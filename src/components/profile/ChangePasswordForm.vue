<template>
  <form class="change-password-form">
    <div class="change-password-form__item">
      <h2>Смена пароля</h2>
    </div>
    <div class="change-password-form__item">
      <input-float
        v-model="passwordData.oldPassword"
        id="oldPassword"
        label="Старый пароль"
      />
    </div>
    <div class="change-password-form__item">
      <input-float
        v-model="passwordData.newPassword"
        id="newPassword"
        label="Новый пароль"
      />
      <p class="error" v-if="!isPasswordMatch">Пароли не совпадают</p>
    </div>
    <div class="change-password-form__item">
      <input-float
        v-model="passwordData.newPasswordConfirm"
        id="newPasswordConfirm"
        label="Повторите новый пароль"
      />
      <p class="error" v-if="!isPasswordMatch">Пароли не совпадают</p>
    </div>
    <div class="change-password-form__item">
      <p-button
        @click="button.action"
        :disabled="button.disabled"
        :loading="button.loading"
      >
        Сменить
      </p-button>
      <p class="error" v-if="button.error">
        {{ button.error }}
      </p>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, markRaw } from 'vue'
import { useToast } from 'primevue/usetoast'
import { userService } from '@/plugins/axios/http/user'
import PButton from 'primevue/button'
import InputFloat from '@/components/common/InputFloat.vue'

const toast = useToast()
const passwordData = reactive({
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
})
const button = reactive({
  disabled: computed(() => {
    return (
      passwordData.oldPassword.length === 0 ||
      passwordData.newPassword.length === 0 ||
      passwordData.newPasswordConfirm.length === 0 ||
      !isPasswordMatch.value
    )
  }),
  error: '',
  loading: false,
  action: markRaw(async () => {
    button.loading = true
    button.error = ''
    const newPasswordData = {}
    Object.assign(newPasswordData, passwordData)
    delete newPasswordData.newPasswordConfirm
    const changePasswordResponse =
      await userService.changePassword(newPasswordData)
    if (changePasswordResponse?.data?.status === 1) {
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: 'Пароль был изменен!',
        life: 3000,
      })
    } else {
      button.error = `Ошибка! Пароль не был изменен - ${changePasswordResponse?.data?.message}`
    }
    button.loading = false
  }),
})
const isPasswordMatch = computed(() => {
  return (
    passwordData.newPassword &&
    passwordData.newPasswordConfirm &&
    passwordData.newPassword === passwordData.newPasswordConfirm
  )
})
</script>

<style scoped lang="scss">
.change-password-form {
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
    gap: 21px;
    .error {
      margin: -10px 0 10px 0;
      color: #a20000;
    }
  }
}
.button {
  margin-top: -15px;
}
</style>
