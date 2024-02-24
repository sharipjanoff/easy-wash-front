<template>
  <div class="home-page">
    <div class="page-header">
      <h1 class="page-header__title">Главная</h1>
      <p-button class="page-header__button">
        <i
          class="pi pi-search"
          style="font-size: 1.5rem; color: var(--primary-color)"
        ></i>
      </p-button>
      <!--      <input-icon icon="search" />-->
    </div>
    <!--    <div class="home-page__item">-->
    <!--      <carousel-->
    <!--        :value="items"-->
    <!--        :num-visible="3"-->
    <!--        :num-scroll="3"-->
    <!--        :responsive-options="responsiveOptions"-->
    <!--      >-->
    <!--        <template #item="slotProps">-->
    <!--          <card-component-->
    <!--            card-type="ad"-->
    <!--            :item="slotProps.data"-->
    <!--            :id="slotProps.index"-->
    <!--          />-->
    <!--        </template>-->
    <!--      </carousel>-->
    <!--    </div>-->
    <div class="home-page__item">
      <h2>Автомойки</h2>
      <carousel
        :value="items"
        :num-visible="3"
        :num-scroll="3"
        :responsive-options="responsiveOptions"
      >
        <template #item="slotProps">
          <card-component
            card-type="cw"
            :item="slotProps.data"
            :id="slotProps.index"
          />
        </template>
      </carousel>
    </div>
    <div class="home-page__item">
      <h2>СТО</h2>
      <carousel
        :value="items2"
        :num-visible="3"
        :num-scroll="3"
        :responsive-options="responsiveOptions"
      >
        <template #item="slotProps">
          <card-component
            card-type="mn"
            :item="slotProps.data"
            :id="slotProps.index"
          />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup>
import Carousel from 'primevue/carousel'
import PButton from 'primevue/button'
import { ref } from 'vue'
import CardComponent from '@/components/home/CardComponent.vue'
import carwashImage from '@/assets/images/carwash.webp'
import maintenance from '@/assets/images/maintenance.webp'
import InputIcon from '@/components/common/InputIcon.vue'

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '475px',
    numVisible: 1,
    numScroll: 1,
  },
])
const items = [
  {
    image: carwashImage,
    name: 'First',
    address: 'Sometthin St.',
    number: '123123',
  },
  {
    image: carwashImage,
    name: 'Second',
    address: 'Sometthin St.',
    number: '123123',
  },
  {
    image: carwashImage,
    name: 'Third',
    address: 'Sometthin St.',
    number: '123123',
  },
  {
    image: carwashImage,
    name: 'Fourth',
    address: 'Sometthin St.',
    number: '123123',
  },
]
const items2 = [
  {
    image: maintenance,
    name: 'First',
    address: 'Sometthin St.',
    number: '123123',
  },
  {
    image: maintenance,
    name: 'Second',
    address: 'Sometthin St.',
    number: '123123',
  },
  {
    image: maintenance,
    name: 'Third',
    address: 'Sometthin St.',
    number: '123123',
  },
  {
    image: maintenance,
    name: 'Fourth',
    address: 'Sometthin St.',
    number: '123123',
  },
]
</script>

<style scoped lang="scss">
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px 25px;

  .page-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 25px;

    &__button {
      display: flex;
      justify-content: center;

      width: 60px;

      background: none;
      border: 1px var(--primary-color) solid;
    }
  }

  &__item {
  }
}
</style>
