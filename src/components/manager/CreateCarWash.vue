<template>
  <form class="create-form">
    <div class="create-form__item">
      <h2>Создание станции обслуживания</h2>
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
        :is-calendar="true"
        v-model="carWashData.startTime"
        id="startTime"
        label="Время открытия (Пример - 09:00)"
      />
    </div>
    <div class="create-form__item">
      <input-float
        :is-calendar="true"
        v-model="carWashData.endTime"
        id="endTime"
        label="Время открытия (Пример - 21:00)"
      />
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
        :loading="button.loading"
        :disabled="button.disabled"
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
    type: [String, null],
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
  startTime: null,
  endTime: null,
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
    carWashData.startTime = normalizeTime(carWashData.startTime)
    carWashData.endTime = normalizeTime(carWashData.endTime)
    emit('sendRequest', carWashData)
    for (const [key, value] of Object.entries(carWashData)) {
      carWashData[key] = null
    }
  }),
})

const validatePhone = phone => {
  return (
    phone &&
    (phone.startsWith('+7') || phone.startsWith('77') || phone.startsWith('87'))
  )
}
const normalizeTime = strDate => {
  const date = new Date(strDate)
  const hours = ('0' + date.getHours()).slice(-2) // Pad with leading zero if necessary
  const minutes = ('0' + date.getMinutes()).slice(-2) // Pad with leading zero if necessary
  return `${hours}:${minutes}:00`
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
