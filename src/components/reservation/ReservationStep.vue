<template>
  <div class="information-step">
    <div class="information-step__item">
      <h2>Выберите дату</h2>
      <calendar
        @update:model-value="
          newDate => {
            date = newDate
            nextTick(() => emit('dateChange', { date, selectedTime }))
          }
        "
        v-model="date"
        inline
        :min-date="today"
      />
      <h2>Выберите время</h2>
      <div class="time-table">
        <div
          class="time-table__item"
          v-for="(item, idx) in timeTable"
          :key="idx"
        >
          <p-button
            @click="selectedTime = item"
            :disabled="!item.available"
            :outlined="selectedTime?.range === item?.range"
          >
            {{ item.range }}
          </p-button>
        </div>
      </div>
      <h2>Выберите машину</h2>
      <p-dropdown
        @change="emit('getPrice', selectedCar.carBodyId)"
        v-model="selectedCar"
        :options="carList"
        option-label="mark"
        placeholder="Выберите авто"
        style="width: 300px; text-align: left"
      />
      <p>
        Список пуст?
        <router-link to="/profile/cars">Создайте машину</router-link>
      </p>
      <div v-if="price">Цена на услугу составит - {{ price.cost }} тенге</div>
      <h2>Выберите бокс</h2>
      <p-dropdown
        v-model="selectedCarBox"
        :options="carBoxList"
        option-label="name"
        placeholder="Выберите бокс"
        style="width: 300px; text-align: left"
      />
      <h2>Выберите работтника</h2>
      <p-dropdown
        v-model="selectedWorker"
        :options="workerList"
        option-label="fio"
        placeholder="Выберите работника"
        style="width: 300px; text-align: left"
      />
      <p-button
        :disabled="disabled"
        class="button"
        label="Дальше"
        @click="
          emit('reserve', {
            date,
            selectedTime: selectedTime.range,
            selectedCar,
            selectedCarBox,
            selectedWorker,
          })
        "
      />
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, reactive, computed } from 'vue'
import Calendar from 'primevue/calendar'
import PButton from 'primevue/button'
import PDropdown from 'primevue/dropdown'

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
  carBoxList: {
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
  price: {
    type: [Object, null],
    required: false,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['dateChange', 'getPrice'])
console.log(props.workerList)

const today = ref(new Date())
const date = ref(today)
const selectedTime = ref(null)
const selectedCar = ref(null)
const selectedCarBox = ref(null)
const selectedWorker = ref(null)
const startTime = props.data.startTime
const endTime = props.data.endTime
const disabled = computed(() => {
  if (!date.value || !selectedCar.value || !selectedTime.value) return true
  return false
})
const timeTable = reactive(generateTimeTable(startTime, endTime))

function generateTimeTable(startTime, endTime) {
  const timeTable = []
  let currentTime = new Date(`1970-01-01T${startTime}`)
  const end = new Date(`1970-01-01T${endTime}`)

  while (currentTime < end) {
    const nextTime = new Date(currentTime)
    nextTime.setHours(currentTime.getHours() + 1)

    const currentTimeString = currentTime.toTimeString().substr(0, 5)
    const nextTimeString = nextTime.toTimeString().substr(0, 5)

    timeTable.push({
      range: `${currentTimeString} - ${nextTimeString}`,
      available: true,
      selected: false,
    })

    currentTime = nextTime
  }

  return timeTable
}
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

    .time-table {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    .button {
      align-self: flex-end;
      width: 150px;
      font-size: 20px;
      max-width: 100%;
    }
  }
}
</style>
