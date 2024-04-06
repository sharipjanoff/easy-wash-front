<template>
  <div class="list-page">
    <map-component v-if="carWashes" :data="carWashes" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { carsService } from '@/plugins/axios/http/cars'
import MapComponent from '@/components/map/MapComponent.vue'

const carWashes = ref(null)
onBeforeMount(async () => {
  carWashes.value = (await carsService.getWashingCentersList())?.data
})
</script>

<style scoped lang="scss">
.list-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
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
