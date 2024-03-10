<template>
  <div class="list-page">
    <map-component :data="data" />
  </div>
</template>

<script setup>
import MapComponent from '@/components/list/MapComponent.vue'

const data = [
  {
    name: 'Moika 1',
    detail: 'Moika 1 detail',
    address: 'Somethin street',
    number: '+77472281337',
    coordinates: [43.211673, 76.857594],
  },
  {
    name: 'Moika 2',
    detail: 'Moika 2 detail',
    address: 'Somethin street',
    number: '+77472281488',
    coordinates: [43.213786, 76.880576],
  },
  {
    name: 'Moika 3',
    detail: 'Moika 3 detail',
    address: 'Somethin street',
    number: '+77472281999',
    coordinates: [43.25654, 76.92848],
  },
]
</script>

<style scoped lang="scss">
.list-page {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;

  .switcher {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    position: absolute;
    z-index: 999;
    top: 3%;
    right: 3.5%;

    padding: 10px;
    background: rgba(240, 248, 255, 0.7);
    border-radius: 20px;
  }
}

@media screen and (max-width: 650px) {
  .list-page {
    padding: 0;
    width: 100vw;
  }
}
</style>
