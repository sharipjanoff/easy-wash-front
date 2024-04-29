<template>
  <form class="car-detail-form">
    <template v-for="(value, key) in newData" :key="key">
      <template v-if="displayItems.includes(key)">
        <div class="car-detail-form__item">
          <template v-if="key === 'carBody'">
            <p-dropdown
              v-model="newData[key]"
              :options="carBodyList"
              option-label="ruName"
              placeholder="Выберите тип кузова"
              style="width: 300px; text-align: left"
            />
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
    <div class="car-detail-form__item">
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
  </form>
</template>

<script setup>
import { computed, markRaw, onBeforeMount, reactive } from 'vue'
import InputFloat from '@/components/common/InputFloat.vue'
import PDropdown from 'primevue/dropdown'
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
  carBodyList: {
    type: [Array, null],
    required: true,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['updateCar'])

const displayItems = ['model', 'mark', 'vrp', 'color', 'carBody']
const newData = reactive({
  id: null,
  model: null,
  mark: null,
  vrp: null,
  color: null,
  carBody: null,
})
const keyTranslationMap = {
  model: 'Модель',
  mark: 'Марка',
  vrp: 'Гос Номер',
  color: 'Цвет',
  carBody: 'Тип Кузова',
}
const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(newData).slice(0, -2)
    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }
    button.error = ''
    return false
  }),
  action: markRaw(async () => {
    emit('updateCar', newData)
  }),
})

onBeforeMount(() => {
  const existingKeys = Object.keys(newData).filter(key =>
    props.data.hasOwnProperty(key),
  )
  Object.assign(
    newData,
    ...existingKeys.map(key => ({ [key]: props.data[key] })),
  )
})
</script>

<style scoped lang="scss">
.car-detail-form {
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
