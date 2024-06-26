<template>
  <div class="reservation-page">
    <component
      :is="currenStep"
      :data="currentServiceStore.data"
      :car-list="carList"
      :worker-list="workerList"
      :wash-price="currentCarWashPrice"
      :wash-box-list="washBoxList"
      :fix-box-list="fixBoxList"
      :fix-list="fixList"
      :reservation-data="reservationData"
      :is-favorite="isFavorite"
      @action="action($event)"
      @rate="rate"
      @start-reservation="startReservation"
      @reserve-wash="reserve($event, 'wash')"
      @reserve-fix="reserve($event, 'fix')"
      @get-wash-price="getWashPrice($event)"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
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
const washBoxList = ref(null)
const fixBoxList = ref(null)
const fixList = ref(null)
const workerList = ref(null)
const current = ref('information')
const currentCarWashPrice = ref(null)
const reservationData = ref(null)
const isFavorite = ref(null)
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
  } else if (type === 'favorite-add') {
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
      return
    }
    toast.add({
      severity: 'success',
      summary: 'Упешно!',
      detail: `${currentServiceStore.data.name} - была добавлена в избранное!`,
      life: 3000,
    })
    isFavorite.value = true
  } else if (type === 'favorite-delete') {
    const response = await carsService.deleteCarWashFromFavorites({
      id: currentServiceStore.data.id,
    })
    if (response?.data?.status === 2 || !response) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка!',
        detail: `${currentServiceStore.data.name} - не была удалена из избранных!`,
        life: 3000,
      })
      return
    }
    toast.add({
      severity: 'success',
      summary: 'Упешно!',
      detail: `${currentServiceStore.data.name} - была удалена из избранных!`,
      life: 3000,
    })
    isFavorite.value = false
  }
}
const rate = async data => {
  const reviewResponse = await carsService.createReview({
    id: currentServiceStore.data.id,
    ...data,
  })
  if (reviewResponse && reviewResponse?.data?.status === 1) {
    toast.add({
      severity: 'success',
      summary: 'Упешно!',
      detail: 'Спасибо за вашу оценку!',
      life: 3000,
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Ошибка!',
      detail: `${reviewResponse.data?.message || 'Вы уже оставляли отзыв'}`,
      life: 3000,
    })
  }
}
const startReservation = () => {
  current.value = 'reservation'
}
const reserve = async (data, type) => {
  const normalizedDate = normalizeDate(data.date, data.selectedTime)
  reservationData.value = {
    ...data,
    normalizedDate,
    washingCenter: currentServiceStore.data,
  }
  const payload = {
    carId: data.selectedCar.id,
    carWashWorkerId: data.selectedWorker.id,
    dateTime: normalizedDate,
  }
  let response
  if (type === 'wash') {
    payload.carWashPriceId = currentCarWashPrice.value.id
    payload.carWashBoxId = data.selectedWashBox.id
    response = await carsService.createOrder(payload)
  }
  if (type === 'fix') {
    payload.carFixId = data.selectedFix.id
    payload.carFixBoxId = data.selectedFixBox.id
    response = await carsService.createFixOrder(payload)
  }
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
const getWashPrice = async carBodyId => {
  const washingCenterId = currentServiceStore.data.id
  currentCarWashPrice.value = (
    await carsService.getPriceById({
      washingCenterId,
      carBodyId,
    })
  )?.data
}

function normalizeDate(dateString, timeString) {
  const date =
    dateString instanceof Date
      ? dateString.toLocaleDateString('en-CA')
      : dateString

  const startTime = timeString.split(' - ')[0].replace(' ', '') + ':00'
  const normalizedDateTime = `${date} ${startTime}`
  return normalizedDateTime
}

onBeforeMount(async () => {
  const isStoreEmpty = Object.keys(currentServiceStore.data)?.length === 0
  if (isStoreEmpty) {
    router.push('/map')
  }
  carList.value = (await carsService.getMyCarList())?.data
  washBoxList.value = (
    await carsService.getWashBoxesByWashingCenterId({
      id: currentServiceStore.data.id,
    })
  )?.data
  fixBoxList.value = (
    await carsService.getFixBoxesByWashingCenterId({
      id: currentServiceStore.data.id,
    })
  )?.data
  workerList.value = (
    await carsService.getWorkersByWashingCenterId({
      id: currentServiceStore.data.id,
    })
  )?.data
  fixList.value = (
    await carsService.getFixList({
      id: currentServiceStore.data.id,
    })
  )?.data

  const favoritesList = (await carsService.getFavoriteCarWash())?.data
  isFavorite.value = favoritesList.some(
    item => item.id === currentServiceStore.data.id,
  )
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
