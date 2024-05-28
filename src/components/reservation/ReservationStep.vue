<template>
  <div class="information-step">
    <div class="information-step__item">
      <h2>Выберите тип услуги</h2>
      <p-dropdown
        v-model="selectedService"
        :options="serviceList"
        option-label="name"
        placeholder="Выберите тип услуги"
        style="width: 300px; text-align: left"
      />
      <component
        v-if="selectedService"
        :is="selectedService.component"
        :car-list="carList"
        :worker-list="workerList"
        :wash-box-list="washBoxList"
        :fix-box-list="fixBoxList"
        :fix-list="fixList"
        :start-time="data.startTime"
        :end-time="data.endTime"
        :wash-price="washPrice"
        @get-wash-price="emit('getWashPrice', $event)"
        @reserve-wash="emit('reserveWash', $event)"
        @reserve-fix="emit('reserveFix', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, markRaw, watch } from 'vue'
import PDropdown from 'primevue/dropdown'
import WashingService from '@/components/reservation/type/WashingService.vue'
import FixService from '@/components/reservation/type/FixService.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  carList: {
    type: [Array, null],
    required: true,
    default: () => {
      return null
    },
  },
  washBoxList: {
    type: [Array, null],
    required: true,
    default: () => {
      return null
    },
  },
  fixBoxList: {
    type: [Array, null],
    required: true,
    default: () => {
      return null
    },
  },
  fixList: {
    type: [Array, null],
    required: true,
    default: () => {
      return null
    },
  },
  workerList: {
    type: [Array, null],
    required: true,
    default: () => {
      return null
    },
  },
  washPrice: {
    type: [Object, null],
    required: false,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['getWashPrice', 'reserveWash', 'reserveFix'])

const selectedService = ref(null)
const serviceList = [
  {
    name: 'Мойка',
    type: 'wash',
    component: markRaw(WashingService),
  },
  {
    name: 'Тех обслуживание',
    type: 'fix',
    component: markRaw(FixService),
  },
]
</script>

<style scoped lang="scss">
.information-step {
  width: 100%;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    width: 100%;
    font-size: 16px;
  }
}
</style>
