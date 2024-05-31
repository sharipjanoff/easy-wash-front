<template>
  <form class="change-user-data-form">
    <div class="change-user-data-form__item">
      <h2>Смена данных пользовтеля</h2>
    </div>
    <div class="change-user-data-form__item">
      <input-float v-model="userData.firstName" id="firstName" label="Имя" />
    </div>
    <div class="change-user-data-form__item">
      <input-float v-model="userData.lastName" id="lastName" label="Фамилия" />
    </div>
    <div class="change-user-data-form__item">
      <input-float v-model="userData.phone" id="phone" label="Телефон" />
    </div>
    <div class="change-user-data-form__item">
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
import { useUserStore } from '@/stores/user'
import PButton from 'primevue/button'
import InputFloat from '@/components/common/InputFloat.vue'

const userStore = useUserStore()
const toast = useToast()
const userData = reactive({
  firstName: userStore?.data?.firstName || '',
  lastName: userStore?.data?.lastName || '',
  phone: userStore?.data?.phone || '',
})
const button = reactive({
  disabled: computed(() => {
    return (
      userData.firstName.length === 0 ||
      userData.lastName.length === 0 ||
      userData.phone.length === 0
    )
  }),
  error: '',
  loading: false,
  action: markRaw(async () => {
    button.loading = true
    button.error = ''
    const changeUserDataResponse = await userService.editUser({
      ...userStore.data,
      ...userData,
      id: userStore.data.id,
    })
    if (changeUserDataResponse?.data?.status === 1) {
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: 'Данные были изменены!',
        life: 3000,
      })
      userStore.data = { ...userStore.data, ...userData }
    } else {
      button.error = `Ошибка! Данные не были изменены - ${changeUserDataResponse?.data?.message}`
    }
    button.loading = false
  }),
})
</script>

<style scoped lang="scss">
.change-user-data-form {
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
