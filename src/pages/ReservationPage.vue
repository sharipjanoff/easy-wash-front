<template>
  <div class="reservation-page">
    <component
      :is="currenStep"
      :data="currentServiceStore.data"
      :car-list="carList"
      :price="currentCarPrice"
      :car-box-list="carBoxList"
      :reservation-data="reservationData"
      @action="action($event)"
      @rate="rate"
      @start-reservation="startReservation"
      @reserve="reserve($event)"
      @get-price="getPrice($event)"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import router from '@/plugins/router'
import { carsService } from '@/plugins/axios/http/cars'
import { useCurrentMapPositionStore } from '@/stores/currenMapPosition'
import { useCurrentServiceStore } from '@/stores/currentService'
import InformationStep from '@/components/reservation/InformationStep.vue'
import ReservationStep from '@/components/reservation/ReservationStep.vue'
import FinishStep from '@/components/reservation/FinishStep.vue'

const currentServiceStore = useCurrentServiceStore()
const currentMapPositionStore = useCurrentMapPositionStore()
const toast = useToast()
const carList = ref(null)
const carBoxList = ref(null)
const current = ref('information')
const currentCarPrice = ref(null)
const reservationData = ref(null)
const steps = {
  information: InformationStep,
  reservation: ReservationStep,
  finish: FinishStep,
}
const currenStep = computed(() => {
  return steps[current.value]
})

const action = async type => {
  if (type === 'map') {
    currentMapPositionStore.coordinates = [
      currentServiceStore.data.lon,
      currentServiceStore.data.lat,
    ]
    currentMapPositionStore.zoom = 25
    router.push('/map')
  } else if (type === 'favorite') {
    const response = await carsService.addCarWashToFavorites({
      id: currentServiceStore.data.id,
    })
    if (response?.data?.status === 2 || !response) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка!',
        detail: `${currentServiceStore.data.name} - не была добавлена в избранное!`,
        life: 3000,
      })
    }
    toast.add({
      severity: 'success',
      summary: 'Упешно!',
      detail: `${currentServiceStore.data.name} - была добавлена в избранное!`,
      life: 3000,
    })
  }
}
const rate = () => {
  toast.add({
    severity: 'success',
    summary: 'Упешно!',
    detail: 'Спасибо за вашу оценку!',
    life: 3000,
  })
}
const startReservation = () => {
  current.value = 'reservation'
}
const reserve = async data => {
  const normalizedDate = normalizeDate(data.date, data.selectedTime)
  reservationData.value = {
    ...data,
    normalizedDate,
    washingCenter: currentServiceStore.data,
  }
  const payload = {
    carWashPriceId: currentCarPrice.value.id,
    carWashBoxId: data.selectedCarBox.id,
    carId: data.selectedCar.id,
    dateTime: normalizedDate,
  }
  const response = await carsService.createOrder(payload)
  if (response?.data?.status === 2 || !response) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка!',
      detail:
        'Резервация не была оформелна, убедитесь в правильности заполненных данных',
      life: 3000,
    })
    return
  }
  toast.add({
    severity: 'success',
    summary: 'Упешно!',
    detail: 'Резервация создана!',
    life: 3000,
  })
  current.value = 'finish'
}

const getPrice = async carBodyId => {
  const washingCenterId = currentServiceStore.data.id
  currentCarPrice.value = (
    await carsService.getPriceById({
      washingCenterId,
      carBodyId,
    })
  )?.data
}

function normalizeDate(dateString, timeString) {
  const date =
    dateString instanceof Date
      ? dateString.toISOString().split('T')[0]
      : dateString
  const startTime = timeString.split(' - ')[0].replace(' ', '') + ':00'
  const normalizedDateTime = `${date} ${startTime}`
  return normalizedDateTime
}

onBeforeMount(async () => {
  const isStoreEmpty = Object.keys(currentServiceStore.data).length === 0
  if (isStoreEmpty) {
    router.push('/map')
  }
  carList.value = (await carsService.getMyCarList())?.data
  carBoxList.value = (
    await carsService.getBoxesByWashingCenterId({
      id: currentServiceStore.data.id,
    })
  )?.data
})
</script>

<style scoped lang="scss">
.reservation-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
  background: #f7f8fa;
  overflow-y: scroll;
}
</style>
