<template>
  <form class="car-wash-detail-form">
    <template v-for="(value, key) in newData" :key="key">
      <template v-if="displayItems.includes(key)">
        <div class="car-wash-detail-form__item">
          <template v-if="key === 'carWashBoxes' || key === 'carWashPrice'">
            <p>
              {{ keyTranslationMap[key] }}
              {{ value.length > 0 ? '' : '- Пусто' }}
            </p>
            <template v-for="(item, idx) of value" :key="idx">
              <input-float
                v-if="value.length > 0"
                v-model="carWashBoxes[idx].name"
                :id="key"
                :label="`Название бокса № ${idx}`"
                :value="carWashBoxes[idx].name"
              />
            </template>
          </template>
          <template v-else>
            <input-float
              v-model="newData[key]"
              :id="key"
              :label="keyTranslationMap[key]"
              :value="value"
            />
          </template>
        </div>
      </template>
    </template>
    <div class="car-wash-detail-form__item">
      <p-button
        @click="button.action"
        :disabled="button.disabled"
        :loading="props.loading"
      >
        Обновить данные
      </p-button>
      <p class="error" v-if="button.error || props.error">
        {{ button.error || props.error }}
      </p>
    </div>
  </form>
</template>

<script setup>
import { computed, markRaw, onBeforeMount, reactive, ref } from 'vue'
import InputFloat from '@/components/common/InputFloat.vue'
import PButton from 'primevue/button'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {
      return {}
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

const displayItems = [
  'name',
  'location',
  'lon',
  'lat',
  'phone',
  'description',
  'carWashPrice',
  'carWashBoxes',
  'id',
]
const newData = reactive({
  createdAt: null,
  updatedAt: null,
  id: null,
  name: null,
  location: null,
  lon: null,
  lat: null,
  phone: null,
  employee: null,
  description: null,
  carWashBoxes: [],
  carWashPrice: [],
})
const keyTranslationMap = {
  name: 'Название',
  location: 'Адрес',
  lon: 'Долгота',
  lat: 'Широта',
  phone: 'Номер телефона',
  description: 'Описание',
  carWashBoxes: 'Список боксов автомойки',
  carWashPrice: 'Список цен на услуги',
  id: 'Идентификатор (для создания боксов)',
}
const carWashBoxes = ref([])
const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(newData).slice(0, -2)
    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }
    if (!validatePhone(newData.phone)) {
      button.error = 'Телефон должен начинаться с +7, 77 или 87'
      return true
    }
    button.error = ''
    return false
  }),
  action: markRaw(async () => {
    newData.carWashBoxes = [...carWashBoxes.value]
    emit('sendRequest', newData)
  }),
})

const validatePhone = phone => {
  return (
    phone &&
    (phone.startsWith('+7') || phone.startsWith('77') || phone.startsWith('87'))
  )
}

onBeforeMount(() => {
  Object.assign(newData, props.data)
  carWashBoxes.value = [...newData.carWashBoxes]
})
</script>

<style scoped lang="scss">
.car-wash-detail-form {
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
    gap: 20px;
    .error {
      color: #a20000;
    }
  }
}
</style>
