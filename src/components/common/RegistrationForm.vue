<template>
  <form class="registration-form">
    <div class="registration-form__item">
      <h2>Создание менеджерского пользователя</h2>
    </div>
    <div class="registration-form__item">
      <input-float v-model="userData.email" id="email" label="Почта" />
    </div>
    <div class="registration-form__item">
      <input-float v-model="userData.firstName" id="firstName" label="Имя" />
    </div>
    <div class="registration-form__item">
      <input-float v-model="userData.lastName" id="lastName" label="Фамилия" />
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
    <div class="registration-form__item">
      <p-button
        @click="button.action"
        :disabled="button.disabled"
        :loading="props.loading"
      >
        Создать
      </p-button>
      <p class="error" v-if="button.error || props.error">
        {{ button.error || props.error }}
      </p>
    </div>
  </form>
</template>

<script setup>
import { computed, markRaw, reactive } from 'vue'
import InputFloat from '@/components/common/InputFloat.vue'
import PButton from 'primevue/button'

const props = defineProps({
  isManager: {
    type: Boolean,
    required: false,
    default: () => {
      return false
    },
  },
  loading: {
    type: Boolean,
    required: false,
    default: () => {
      return false
    },
  },
  error: {
    type: String || null,
    required: false,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['sendRequest'])

const userData = reactive({
  email: null,
  firstName: null,
  lastName: null,
  phone: null,
  password: null,
  passwordConfirm: null,
  id: null,
  type: props.isManager ? 'EMPLOYEE' : 'CLIENT',
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
    emit('sendRequest', userData)
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
.registration-form {
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
</style>
