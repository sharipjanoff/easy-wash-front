<template>
  <div class="map-component">
    <l-map
      :use-global-leaflet="false"
      ref="map"
      v-model:zoom="mapSettings.zoom"
      :center="mapSettings.center"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <template v-for="(item, index) of data" :key="index">
        <l-marker
          :lat-lng="[item.lon, item.lat]"
          @click="zoomInIcon([item.lon, item.lat])"
        >
          <l-icon :icon-url="pinIcon" :icon-size="[40, 40]" />
          <l-popup>
            <div class="station-info">
              <div class="station-info__item">Название: {{ item.name }}</div>
              <div class="station-info__item">Телефон: {{ item.phone }}</div>
              <div class="station-info__item">Адрес: {{ item.location }}</div>
              <p-button
                label="Оформить резервацию"
                @click="openReservationPage(item)"
              />
            </div>
          </l-popup>
        </l-marker>
      </template>
    </l-map>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import router from '@/plugins/router'
import {
  LMap,
  LTileLayer,
  LIcon,
  LMarker,
  LPopup,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import PButton from 'primevue/button'
import pinIcon from '@/assets/icons/pin.png'
import { useCurrentServiceStore } from '@/stores/currentService'
import { useCurrentMapPositionStore } from '@/stores/currenMapPosition'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const currentService = useCurrentServiceStore()
const currentMapPosition = useCurrentMapPositionStore()
const mapSettings = reactive({
  zoom: 13,
  center:
    currentMapPosition.coordinates.length > 0
      ? currentMapPosition.coordinates
      : [43.25654, 76.92848],
})

const openReservationPage = info => {
  currentService.data = info
  router.push('/reservation')
}
const zoomInIcon = coordinates => {
  mapSettings.center = coordinates
}
</script>

<style lang="scss">
.map-component {
  width: 100%;
  height: 100%;

  .station-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .item {
    }
  }
}
</style>
