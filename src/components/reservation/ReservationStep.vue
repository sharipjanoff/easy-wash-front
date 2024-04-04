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
      {{ date }}
      {{ selectedTime }}
      <p-button class="button" label="Дальше" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, reactive } from 'vue'
import Calendar from 'primevue/calendar'
import PButton from 'primevue/button'

const emit = defineEmits(['dateChange'])
const today = ref(new Date())
const date = ref(null)
const selectedTime = ref(null)
const timeTable = reactive([
  {
    range: '09:00 - 10:00',
    available: false,
    selected: false,
  },
  {
    range: '10:00 - 11:00',
    available: false,
    selected: false,
  },
  {
    range: '11:00 - 12:00',
    available: false,
    selected: false,
  },
  {
    range: '12:00 - 13:00',
    available: false,
    selected: false,
  },
  {
    range: '14:00 - 15:00',
    available: false,
    selected: false,
  },
  {
    range: '16:00 - 17:00',
    available: false,
    selected: false,
  },
  {
    range: '18:00 - 19:00',
    available: true,
    selected: false,
  },
  {
    range: '19:00 - 20:00',
    available: true,
    selected: false,
  },
  {
    range: '20:00 - 21:00',
    available: true,
    selected: false,
  },
])
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
