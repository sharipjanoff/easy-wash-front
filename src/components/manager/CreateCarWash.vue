<template>
  <form class="create-form">
    <div class="create-form__item">
      <h2>Создание автомойки</h2>
    </div>
    <div class="create-form__item">
      <input-float v-model="carWashData.name" id="name" label="Название" />
    </div>
    <div class="create-form__item">
      <input-float v-model="carWashData.location" id="location" label="Адрес" />
    </div>
    <div class="create-form__item">
      <input-float v-model="carWashData.lon" id="lon" label="Долгота" />
    </div>
    <div class="create-form__item">
      <input-float v-model="carWashData.lat" id="lat" label="Широта" />
    </div>
    <div class="create-form__item">
      <input-float
        v-model="carWashData.phone"
        id="phone"
        label="Номер телефона"
      />
    </div>
    <div class="create-form__item">
      <input-float
        v-model="carWashData.description"
        id="description"
        label="Описание"
      />
    </div>
    <div class="create-form__item">
      <p-button
        @click="button.action"
        :disabled="button.disabled"
        :loading="button.loading"
      >
        Создать
      </p-button>
      <p class="error" v-if="button.error.length || props.error">
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

const carWashData = reactive({
  name: null,
  location: null,
  lon: null,
  lat: null,
  phone: null,
  description: null,
})

const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(carWashData).slice()
    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }
    if (!validatePhone(carWashData.phone)) {
      button.error = 'Телефон должен начинаться с +7, 77 или 87'
      return true
    }
    button.error = ''
    return false
  }),
  action: markRaw(() => {
    emit('sendRequest', carWashData)
  }),
})

const validatePhone = phone => {
  return (
    phone &&
    (phone.startsWith('+7') || phone.startsWith('77') || phone.startsWith('87'))
  )
}
</script>

<style scoped lang="scss">
.create-form {
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
