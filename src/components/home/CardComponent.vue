<template>
  <card class="card-component">
    <template #header>
      <div class="image-container">
        <img
          class="image-container__image"
          alt="user header"
          :src="item.image"
        />
      </div>
    </template>
    <template #title>
      <div class="card-component__title">
        {{ item.name }}
      </div>
    </template>
    <template #content>
      <div class="card-component__content">
        {{ item.address }}
      </div>
    </template>
    <template #footer>
      <div class="card-component__footer">
        {{ item.number }}
      </div>
    </template>
  </card>
</template>

<script setup>
import Card from 'primevue/card'
import carwashImage from '@/assets/images/carwash.webp'

const props = defineProps({
  cardType: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.card-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;

  .image-container {
    width: 200px;
    height: 200px;

    &__image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
