<template>
  <div class="create-worker">
    <div class="create-worker__item">
      <h2>Добавление рабочего</h2>
    </div>
    <div class="create-worker__item">
      <p-dropdown
        v-model="workerData.washingCenter"
        :options="carWashList"
        option-label="name"
        placeholder="Выберите станцию"
        style="width: 300px; text-align: left"
      />
    </div>
    <div class="create-worker__item">
      <input-float v-model="workerData.firstName" id="firstName" label="Имя" />
    </div>
    <div class="create-box__item">
      <input-float
        v-model="workerData.lastName"
        id="lastName"
        label="Фамилия"
      />
    </div>
    <div class="create-box__item">
      <input-float v-model="workerData.phone" id="phone" label="Телефон" />
    </div>
    <div class="create-worker__item">
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

const workerData = reactive({
  washingCenter: null,
  firstName: null,
  lastName: null,
  phone: null,
})
const button = reactive({
  error: '',
  loading: false,
  disabled: computed(() => {
    const fields = Object.values(workerData).slice()
    if (fields.includes(null) || fields.includes('')) {
      button.error = 'Заполните все поля'
      return true
    }
    button.error = ''
    return false
  }),
  action: markRaw(() => {
    emit('sendRequest', {
      firstName: workerData.firstName,
      lastName: workerData.lastName,
      phone: workerData.phone,
      washingCenterId: workerData.washingCenter.id,
    })
  }),
})
</script>

<style scoped lang="scss">
.create-worker {
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
