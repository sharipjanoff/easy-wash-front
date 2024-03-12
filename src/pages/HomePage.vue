<template>
  <div class="home-page">
    <div class="page-header" :class="{ 'page-header_column': showSearch }">
      <h1 class="page-header__title">Главная</h1>
      <div v-show="showSearch" class="search-input-container">
        <input-text
          type="text"
          class="search-input"
          placeholder="Поиск..."
          v-model="searchQuery"
          @keydown.enter="handleSearch"
        />
        <i
          class="pi pi-search search-icon"
          style="font-size: 1.5rem; color: var(--primary-color)"
          @click="handleSearch"
        />
      </div>
      <p-button
        v-show="!showSearch"
        class="page-header__button"
        @click="showSearch = true"
      >
        <i
          class="pi pi-search"
          style="font-size: 1.5rem; color: var(--primary-color)"
        />
      </p-button>
    </div>
    <div class="home-page__item">
      <h2>СТО</h2>
      <carousel
        :value="items"
        :num-visible="3"
        :num-scroll="3"
        :responsive-options="responsiveOptions"
      >
        <template #item="slotProps">
          <div class="carousel-item">
            <img
              class="carousel-item__image"
              :src="slotProps.data.image"
              alt="Carwash Image"
            />
            <div class="carousel-item__name">
              {{ slotProps.data.name }}
            </div>
            <div class="carousel-item__address">
              {{ slotProps.data.address }}
            </div>
            <div class="carousel-item__phone">
              {{ slotProps.data.phone }}
            </div>
          </div>
        </template>
      </carousel>
    </div>
    <div class="home-page__item">
      <h2>Автомойки</h2>
      <carousel
        :value="items2"
        :num-visible="3"
        :num-scroll="3"
        :responsive-options="responsiveOptions"
      >
        <template #item="slotProps">
          <div class="carousel-item">
            <img
              class="carousel-item__image"
              :src="slotProps.data.image"
              alt="Carwash Image"
            />
            <div class="carousel-item__name">
              {{ slotProps.data.name }}
            </div>
            <div class="carousel-item__address">
              {{ slotProps.data.address }}
            </div>
            <div class="carousel-item__phone">
              {{ slotProps.data.phone }}
            </div>
          </div>
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PButton from 'primevue/button'
import InputText from 'primevue/inputtext'
import Carousel from 'primevue/carousel'
import carwashImage from '@/assets/images/carwash.webp'
import maintenance from '@/assets/images/maintenance.webp'

const showSearch = ref(false)
const searchQuery = ref('')
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 5,
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
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
])
const items = [
  {
    image: carwashImage,
    name: 'First',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: carwashImage,
    name: 'Second',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: carwashImage,
    name: 'Third',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: carwashImage,
    name: 'Fourth',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: carwashImage,
    name: 'Fifth',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: carwashImage,
    name: 'Sixth',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: carwashImage,
    name: 'Seventh',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: carwashImage,
    name: 'Eighth',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: carwashImage,
    name: 'Ninth',
    address: 'Sometthin St.',
    phone: '123123',
  },
]
const items2 = [
  {
    image: maintenance,
    name: 'First',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: maintenance,
    name: 'Second',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: maintenance,
    name: 'Third',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: maintenance,
    name: 'Fourth',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: maintenance,
    name: 'Fifth',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: maintenance,
    name: 'Sixth',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: maintenance,
    name: 'Seventh',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: maintenance,
    name: 'Eighth',
    address: 'Sometthin St.',
    phone: '123123',
  },
  {
    image: maintenance,
    name: 'Ninth',
    address: 'Sometthin St.',
    phone: '123123',
  },
]

const handleSearch = () => {
  console.log(searchQuery.value)
}
</script>

<style scoped lang="scss">
.home-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px 25px 75px 25px;
  background: #f7f8fa;

  .page-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    position: relative;
    transition: all 0.3s ease;

    &.page-header_column {
      flex-direction: column;
    }
    .search-input-container {
      display: none;
      opacity: 0;
      transform: translateY(-20px) translateX(30px);
      transition:
        opacity 0.5s ease,
        transform 0.5s ease; // Animate opacity and position
      width: 100%;
      height: 40px;
      position: relative;
      input.search-input {
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .search-icon {
        position: absolute;
        top: 50%;
        right: 1px;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
    }
    &__button {
      transition: opacity 0.3s ease;
      display: flex;
      justify-content: center;
      width: 60px;
      background: none;
      border: 1px var(--primary-color) solid;
    }
  }
  .page-header_column {
    flex-direction: column;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
  }

  .carousel-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__image {
      width: 150px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

// Use this outside of .home-page to apply when the condition is met
.search-input-container {
  display: block !important; // Override the display none when the container should be visible
}

// Adjust for when the search is active
.home-page .page-header.page-header_column .search-input-container {
  opacity: 1;
  transform: translateY(0);
}

.page-header__buton {
  opacity: 0;
}
</style>
