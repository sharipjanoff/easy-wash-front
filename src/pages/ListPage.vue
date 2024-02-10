<template>
  <div class="list-page">
    <div class="switcher">
      <div class="switcher__option">Map</div>
      <input-switch v-model="checked" />
      <div class="switcher__option">List</div>
    </div>
    <component :is="current" :data="data"></component>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import InputSwitch from 'primevue/inputswitch'
import MapComponent from '@/components/list/MapComponent.vue'
import ListComponent from '@/components/list/ListComponent.vue'

const checked = ref(false)
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
const current = computed(() => {
  return checked.value ? ListComponent : MapComponent
})
</script>

<style scoped lang="scss">
.list-page {
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
</style>
