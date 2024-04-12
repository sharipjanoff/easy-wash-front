<template>
  <form class="car-body-form">
    <div class="car-body-form__item">
      <h2>Добавление нового кузова</h2>
    </div>
    <div class="car-body-form__item">
      <input-float
        v-model="carBodyData.type"
        id="type"
        label="Вид(На английском)"
      />
    </div>
    <div class="car-body-form__item">
      <input-float
        v-model="carBodyData.ruName"
        id="ruName"
        label="Русское название"
      />
    </div>
    <div class="car-body-form__item">
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

const carBodyData = reactive({
  type: null,
  ruName: null,
})
const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(carBodyData).slice(0, -2)
    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }
    button.error = ''
    return false
  }),
  action: markRaw(async () => {
    Object.keys(carBodyData).forEach(item => {
      carBodyData[item] = carBodyData[item].toLowerCase()
    })
    emit('sendRequest', carBodyData)
  }),
})
</script>

<style scoped lang="scss">
.car-body-form {
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
