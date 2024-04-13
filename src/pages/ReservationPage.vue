<template>
  <div class="reservation-page">
    <component
      :is="currenStep"
      @action="action($event)"
      @rate="rate"
      @reserve="reserve"
      @date-change="dateChange($event)"
      :data="currentServiceStore.data"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import router from '@/plugins/router'
import { useCurrentMapPositionStore } from '@/stores/currenMapPosition'
import { useCurrentServiceStore } from '@/stores/currentService'
import InformationStep from '@/components/reservation/InformationStep.vue'
import ReservationStep from '@/components/reservation/ReservationStep.vue'

const currentServiceStore = useCurrentServiceStore()
const currentMapPositionStore = useCurrentMapPositionStore()
const toast = useToast()
const current = ref('information')
const steps = {
  information: InformationStep,
  reservation: ReservationStep,
}
const currenStep = computed(() => {
  return steps[current.value]
})

const action = type => {
  console.log(currentServiceStore)
  if (type === 'map') {
    currentMapPositionStore.coordinates = [
      currentServiceStore.data.lon,
      currentServiceStore.data.lat,
    ]
    currentMapPositionStore.zoom = 25
    router.push('/map')
  } else {
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
const reserve = () => {
  current.value = 'reservation'
}
const dateChange = data => {
  console.log('dateChanged', data.date)
}

onBeforeMount(() => {
  const isStoreEmpty = Object.keys(currentServiceStore.data).length === 0
  if (isStoreEmpty) {
    router.push('/map')
  }
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
