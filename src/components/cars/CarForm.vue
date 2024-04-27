<template>
  <div class="car-form">
    <div class="car-form__item">
      <h2>Добавление нового авто</h2>
    </div>
    <div class="car-form__item">
      <input-float
        v-model="carData.vrp"
        id="vrp"
        label="Гос номер (999AAA01)"
      />
    </div>
    <div class="car-form__item">
      <input-float
        v-model="carData.mark"
        id="mark"
        label="Марка (Toyota, Lexus и т.д)"
      />
    </div>
    <div class="car-form__item">
      <input-float
        v-model="carData.model"
        id="model"
        label="Модель (Camry, GS и т.д)"
      />
    </div>
    <div class="car-form__item">
      <input-float
        v-model="carData.color"
        id="color"
        label="Цвет на английском (Black, White и т.д)"
      />
    </div>
    <div class="car-form__item">
      <p-dropdown
        v-model="carData.carBodyId"
        :options="carBodyList"
        option-label="ruName"
        placeholder="Выберите тип кузова"
        style="width: 300px; text-align: left"
      />
    </div>
    <div class="car-form__item">
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
  </div>
</template>

<script setup>
import { computed, markRaw, reactive } from 'vue'
import InputFloat from '@/components/common/InputFloat.vue'
import PButton from 'primevue/button'
import PDropdown from 'primevue/dropdown'

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
  carBodyList: {
    type: [Array, null],
    required: true,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['sendRequest'])

const carData = reactive({
  vrp: null,
  model: null,
  mark: null,
  color: null,
  carBodyId: null,
})
const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(carData).slice(0)
    const vrpValue = carData.vrp

    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }

    if (!vrpValue || vrpValue.length !== 8) {
      button.error = 'Неверный формат номера'
      return true
    }

    const firstThreeSymbols = vrpValue.slice(0, 3)
    const numberRegex = /^[0-9]{1,3}$/
    if (!numberRegex.test(firstThreeSymbols)) {
      button.error = 'Первые три символа должны быть числами'
      return true
    }

    const nextThreeSymbols = vrpValue.slice(3, 6)
    const latinRegex = /^[A-Za-z]{3}$/
    if (!latinRegex.test(nextThreeSymbols)) {
      button.error = 'Символы с 4 по 6 должны быть латинскими буквами'
      return true
    }

    const lastTwoSymbols = vrpValue.slice(-2)
    if (!numberRegex.test(lastTwoSymbols)) {
      button.error = 'Последние два символа должны быть числами'
      return true
    }

    button.error = ''
    return false
  }),
  action: markRaw(async () => {
    Object.keys(carData).forEach(item => {
      if (item === 'vrp') {
        carData[item] = carData[item].toUpperCase()
      } else if (item !== 'carBodyId')
        carData[item] =
          carData[item].charAt(0).toUpperCase() +
          carData[item].slice(1).toLowerCase()
    })
    carData.carBodyId = carData.carBodyId.id
    emit('sendRequest', carData)
    Object.keys(carData).forEach(item => {
      carData[item] = null
    })
  }),
})
</script>

<style scoped lang="scss">
.car-form {
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
