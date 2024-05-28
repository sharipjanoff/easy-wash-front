<template>
  <div class="fix-service">
    <h2>Выберите бокс</h2>
    <p-dropdown
      v-model="selectedFixBox"
      :options="fixBoxList"
      option-label="name"
      placeholder="Выберите бокс"
      style="width: 300px; text-align: left"
    />
    <h2>Выберите Услугу</h2>
    <p-dropdown
      v-model="selectedFix"
      :options="fixList"
      option-label="ruName"
      placeholder="Выберите услугу"
      style="width: 300px; text-align: left"
    />
    <div v-if="selectedFix">
      Цена на услугу составит - {{ selectedFix.cost }} тенге
    </div>
    <h2>Выберите работника</h2>
    <p-dropdown
      v-model="selectedWorker"
      :options="workerList"
      option-label="fio"
      placeholder="Выберите работника"
      style="width: 300px; text-align: left"
    />
    <template v-if="selectedFixBox && selectedWorker && selectedFix">
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
            v-tooltip="item.available ? '' : 'Зарезервировано'"
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
        <p-button
          :disabled="disabled"
          class="button"
          label="Создать заказ"
          @click="
            emit('reserveFix', {
              date,
              selectedTime: selectedTime.range,
              selectedCar,
              selectedFixBox,
              selectedWorker,
              selectedFix,
            })
          "
        />
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import Calendar from 'primevue/calendar'
import PButton from 'primevue/button'
import PDropdown from 'primevue/dropdown'
import VTooltip from 'primevue/tooltip'
import { carsService } from '@/plugins/axios/http/cars.js'

const props = defineProps({
  carList: {
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
  price: {
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
const emit = defineEmits(['getFixPrice', 'reserveFix'])
const selectedFixBox = ref(null)
const selectedFix = ref(null)
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

watch(selectedFixBox, async () => {
  if (date.value) {
    const list = await carsService.getFixOrderList({
      id: selectedFixBox.value.id,
      date: normalizeDate(date.value),
    })
    timeTable.value = updateTimetableAvailability(timeTable.value, list.data)
  }
})
watch(date, async () => {
  if (selectedFixBox.value) {
    const list = await carsService.getFixOrderList({
      id: selectedFixBox.value.id,
      date: normalizeDate(date.value),
    })
    timeTable.value = updateTimetableAvailability(timeTable.value, list.data)
  }
})
</script>

<style scoped>
.fix-service {
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
