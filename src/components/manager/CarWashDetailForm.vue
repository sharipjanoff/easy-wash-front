<template>
  <form class="car-wash-detail-form">
    <template v-for="(value, key) in newData" :key="key">
      <template v-if="displayItems.includes(key) && !key.includes('Time')">
        <div
          class="car-wash-detail-form__item"
          v-if="key !== 'carWashBoxes' && key !== 'carWashPrice'"
        >
          <input-float
            v-model="newData[key]"
            :id="key"
            :label="keyTranslationMap[key]"
            :value="value"
          />
        </div>
      </template>
      <template v-if="displayItems.includes(key) && key.includes('Time')">
        <div
          class="car-wash-detail-form__item"
          v-if="key !== 'carWashBoxes' && key !== 'carWashPrice'"
        >
          <input-float
            :is-calendar="true"
            v-model="newData[key]"
            :id="key"
            :label="keyTranslationMap[key]"
            :value="value"
          />
        </div>
      </template>
    </template>
    <div class="car-wash-detail-form__item">
      <p-button
        class="button"
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
    <div class="car-wash-detail-form__item">
      <h4>Список Боксов Мойки</h4>
      <template v-if="newData.carWashBoxes.length > 0">
        <template v-for="(item, idx) of newData.carWashBoxes" :key="idx">
          <input-float
            v-model="carWashBoxes[idx].name"
            :id="carWashBoxes[idx].id"
            :label="`Название бокса № ${idx + 1}`"
            :value="carWashBoxes[idx].name"
          />
          <p-button class="button" @click="emit('updateBox', carWashBoxes[idx])"
            >Обновить бокс</p-button
          >
        </template>
      </template>
      <template v-else>Список пуст</template>
    </div>
    <div class="car-wash-detail-form__item">
      <h4>Список Боксов Технического Обслуживания</h4>
      <template v-if="newData.carFixBoxes.length > 0">
        <template v-for="(item, idx) of newData.carFixBoxes" :key="idx">
          <input-float
            v-model="carFixBoxes[idx].name"
            :id="carFixBoxes[idx].id"
            :label="`Название бокса № ${idx + 1}`"
            :value="carFixBoxes[idx].name"
          />
          <p-button
            class="button"
            @click="emit('updateFixBox', carFixBoxes[idx])"
            >Обновить бокс</p-button
          >
        </template>
      </template>
      <template v-else>Список пуст</template>
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
const emit = defineEmits(['updateWashingCenter', 'updateBox'])

const displayItems = [
  'name',
  'location',
  'lon',
  'lat',
  'phone',
  'description',
  'carWashPrice',
  'carWashBoxes',
  'startTime',
  'endTime',
]
const newData = reactive({
  id: null,
  name: null,
  location: null,
  lon: null,
  lat: null,
  phone: null,
  description: null,
  startTime: null,
  endTime: null,
  carWashBoxes: [],
  carWashPrice: [],
  carFixBoxes: [],
  carFixes: [],
})
const keyTranslationMap = {
  name: 'Название',
  location: 'Адрес',
  lon: 'Долгота',
  lat: 'Широта',
  phone: 'Номер телефона',
  description: 'Описание',
  carWashBoxes: 'Список боксов автомойки',
  carFixBoxes: 'Список боксов технического обслуживаниыя',
  carWashPrice: 'Список цен на услуги',
  startTime: 'Время открытия',
  endTime: 'Время закрытия',
}
const carWashBoxes = ref([])
const carFixBoxes = ref([])
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
    newData.startTime =
      newData.startTime !== props.data.startTime
        ? normalizeTime(newData.startTime)
        : props.data.startTime
    newData.endTime =
      newData.endTime !== props.data.endTime
        ? normalizeTime(newData.endTime)
        : props.data.endTime
    newData.carWashBoxes = [...carWashBoxes.value]
    emit('updateWashingCenter', newData)
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

onBeforeMount(() => {
  const existingKeys = Object.keys(newData).filter(key =>
    props.data.hasOwnProperty(key),
  )
  Object.assign(
    newData,
    ...existingKeys.map(key => ({ [key]: props.data[key] })),
  )
  carWashBoxes.value = [...newData.carWashBoxes]
  carFixBoxes.value = [...newData.carFixBoxes]
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
    gap: 21px;
    .error {
      color: #a20000;
    }
  }
}
.button {
  margin-top: -15px;
}
</style>
