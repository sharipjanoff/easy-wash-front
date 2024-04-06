<template>
  <div class="list-page">
    <map-component :data="data" />
  </div>
</template>

<script setup>
import MapComponent from '@/components/map/MapComponent.vue'

const data = [
  {
    name: 'Moika 1',
    detail: 'Moika 1 detail',
    address: 'Somethin street',
    number: '+77472281337',
    coordinates: [43.211673, 76.857594],
    serviceType: 'Автомойка',
    workTime: '9:00 - 21:00',
  },
  {
    name: 'Moika 2',
    detail: 'Moika 2 detail',
    address: 'Somethin street',
    number: '+77472281488',
    coordinates: [43.213786, 76.880576],
    serviceType: 'Автомойка',
    workTime: '9:00 - 21:00',
  },
  {
    name: 'Moika 3',
    detail: 'Moika 3 detail',
    address: 'Somethin street',
    number: '+77472281999',
    coordinates: [43.25654, 76.92848],
    serviceType: 'Автомойка',
    workTime: '9:00 - 21:00',
  },
]
</script>

<style scoped lang="scss">
.list-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px 25px 75px 25px;
  background: #f7f8fa;
  overflow-y: scroll;
}

@media screen and (max-width: 650px) {
  .list-page {
    padding: 0;
    width: 100vw;
  }
}
</style>
