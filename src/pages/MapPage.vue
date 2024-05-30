<template>
  <div class="list-page">
    <map-component v-if="carWashes" :data="carWashes" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { carsService } from '@/plugins/axios/http/cars'
import MapComponent from '@/components/map/MapComponent.vue'
import { fileService } from '../plugins/axios/http/file'

const carWashes = ref(null)
function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

function convertToImageSrc(buffer) {
  const base64String = arrayBufferToBase64(buffer)
  const mimeType = 'image/jpeg' // Change to the correct MIME type if needed
  return `data:${mimeType};base64,${base64String}`
}
onBeforeMount(async () => {
  carWashes.value = (await carsService.getWashingCentersList())?.data

  for (const carWash of carWashes.value) {
    if (carWash.headings && carWash.headings.length > 0) {
      carWash.images = []

      for (const headingId of carWash.headings) {
        try {
          const imageResponse = await fileService.getImage(headingId)
          const imageData = imageResponse.data
          const imageSrc = convertToImageSrc(imageData)
          carWash.images.push(imageSrc)
        } catch (error) {
          console.error(`Error fetching image for ID ${headingId}:`, error)
        }
      }
      carWash.image = carWash.images[0]
    }
  }
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
