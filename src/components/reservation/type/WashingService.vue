<template>
  <div class="washing-service">
    <h2>Выберите бокс</h2>
    <p-dropdown
      v-model="selectedWashBox"
      :options="washBoxList"
      option-label="name"
      placeholder="Выберите бокс"
      style="width: 300px; text-align: left"
    />
    <h2>Выберите работника</h2>
    <p-dropdown
      v-model="selectedWorker"
      :options="workerList"
      option-label="fio"
      placeholder="Выберите работника"
      style="width: 300px; text-align: left"
    />
    <template v-if="selectedWashBox && selectedWorker">
      <h2>Выберите дату</h2>
      <calendar v-model="date" inline :min-date="today" />
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
      <template v-if="date && selectedTime">
        <h2>Выберите машину</h2>
        <p-dropdown
          @change="emit('getWashPrice', selectedCar.carBodyId)"
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
        <div v-if="washPrice">
          Цена на услугу составит - {{ washPrice.cost }} тенге
        </div>
        <p-button
          :disabled="disabled"
          class="button"
          label="Создать заказ"
          @click="
            emit('reserveWash', {
              date,
              selectedTime: selectedTime.range,
              selectedCar,
              selectedWashBox: selectedWashBox,
              selectedWorker,
            })
          "
        />
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import Calendar from 'primevue/calendar'
import PButton from 'primevue/button'
import PDropdown from 'primevue/dropdown'
import { carsService } from '@/plugins/axios/http/cars.js'

const props = defineProps({
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
  startTime: {
    type: [String, null],
    required: false,
    default: () => {
      return null
    },
  },
  endTime: {
    type: [String, null],
    required: false,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['getWashPrice', 'reserveWash'])

const selectedWashBox = ref(null)
const selectedWorker = ref(null)
const selectedTime = ref(null)
const selectedCar = ref(null)
const today = ref(new Date())
const date = ref(new Date())

const timeTable = ref(generateTimeTable(props.startTime, props.endTime))
const disabled = computed(() => {
  if (!date.value || !selectedCar.value || !selectedTime.value) return true
  return false
})

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
function updateTimetableAvailability(timetable, orders) {
  const bookedTimes = new Set()
  orders.forEach(order => {
    const time = order.dateTime.split(' ')[1]
    bookedTimes.add(time)
  })
  timetable.forEach(slot => {
    const [startTime] = slot.range.split(' - ')
    if (bookedTimes.has(startTime + ':00')) {
      slot.available = false
    } else {
      slot.available = true
    }
  })

  return timetable
}
function normalizeDate(dateInput) {
  const dateString = `${dateInput}`
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

watch(selectedWashBox, async () => {
  if (date.value) {
    const list = await carsService.getOrderList({
      id: selectedWashBox.value.id,
      date: normalizeDate(date.value),
    })
    timeTable.value = updateTimetableAvailability(timeTable.value, list.data)
  }
})
watch(date, async () => {
  if (selectedWashBox.value) {
    const list = await carsService.getOrderList({
      id: selectedWashBox.value.id,
      date: normalizeDate(date.value),
    })
    timeTable.value = updateTimetableAvailability(timeTable.value, list.data)
  }
})
</script>

<style scoped>
.washing-service {
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
</style>
