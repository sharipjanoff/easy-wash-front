<template>
  <div class="create-price">
    <div class="create-price__item">
      <h2>Настройка цен для автомойки по типу кузова</h2>
      <p>
        Айди Автомойки вы можете найти выше в таблице "Список ваших автомоек"
      </p>
    </div>
    <div class="create-price__item">
      <p-dropdown
        v-model="priceData.washingCenter"
        :options="carWashList"
        option-label="name"
        placeholder="Выберите автомойку"
        style="width: 300px; text-align: left"
      />
    </div>
    <div class="create-price__item">
      <p-dropdown
        v-model="priceData.carBody"
        :options="carBodyList"
        option-label="ruName"
        placeholder="Выберите тип кузова"
        style="width: 300px; text-align: left"
      />
    </div>
    <div class="create-box__item">
      <input-float v-model="priceData.cost" id="cost" label="Цена" />
    </div>
    <div class="create-price__item">
      <p-button
        @click="button.action"
        :disabled="button.disabled"
        :loading="button.loading"
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
import PDropdown from 'primevue/dropdown'
import PButton from 'primevue/button'

const props = defineProps({
  carWashList: {
    type: Array,
    required: true,
    default: () => {
      return []
    },
  },
  carBodyList: {
    type: Array,
    required: true,
    default: () => {
      return []
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

const priceData = reactive({
  washingCenter: null,
  carBody: null,
  cost: null,
})
const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(priceData).slice()
    console.log(fields)
    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }
    button.error = ''
    return false
  }),
  action: markRaw(() => {
    emit('sendRequest', {
      cost: priceData.cost,
      washingCenterId: priceData.washingCenter.id,
      carBodyTypeId: priceData.carBody.id,
    })
  }),
})
</script>

<style scoped lang="scss">
.create-price {
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
