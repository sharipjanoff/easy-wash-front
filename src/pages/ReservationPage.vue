<template>
  <div class="reservation-page">
    <div class="reservation-page__item">
      <h1>{{ currentServiceStore.data.name }}</h1>
      <div class="image-container">
        <img :src="firstImage" alt="Image 1" />
        <img :src="secondImage" alt="Image 2" />
      </div>
      <tab-view>
        <tab-panel header="Обзор">
          <div class="container">
            <div class="list">
              <div class="item">
                <div class="item__icon">
                  <i class="pi pi-map-marker" style="font-size: 2rem"></i>
                </div>
                <div class="info">
                  <div class="info__label">
                    <h3>Адрес</h3>
                  </div>
                  <div class="info__value">
                    {{ currentServiceStore.data.address }}
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item__icon">
                  <i class="pi pi-clock" style="font-size: 2rem"></i>
                </div>
                <div class="info">
                  <div class="info__label">
                    <h3>Время работы</h3>
                  </div>
                  <div class="info__value">
                    {{ currentServiceStore.data.workTime }}
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item__icon">
                  <i class="pi pi-cog" style="font-size: 2rem"></i>
                </div>
                <div class="info">
                  <div class="info__label">
                    <h3>Об услугах</h3>
                  </div>
                  <div class="info__value">
                    {{ currentServiceStore.data.serviceType }}
                  </div>
                </div>
              </div>
            </div>
            <div class="actions">
              <div class="action" @click="action('favorite')">
                <div class="action__icon">
                  <i class="pi pi-heart" style="font-size: 2rem"></i>
                </div>
                <div class="actions__label">Добавить в избранное</div>
              </div>
              <div class="action" @click="action('map')">
                <div class="action__icon">
                  <i class="pi pi-map" style="font-size: 2rem"></i>
                </div>
                <div class="actions__label">Открыть на карте</div>
              </div>
            </div>
            <p-button class="button" label="Записаться" />
          </div>
        </tab-panel>
        <tab-panel header="Отзывы">
          <div class="container">
            <template v-if="reviews.length > 0"></template>
            <template v-else>
              <div class="review">
                <h2>Оцените это место</h2>
                <rating v-model="ratingValue" :cancel="false" />
                <p-button label="Оставить отзыв"></p-button>
              </div>
            </template>
          </div>
        </tab-panel>
      </tab-view>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import router from '@/plugins/router'
import { useCurrentServiceStore } from '@/stores/currentService'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import PButton from 'primevue/button'
import Rating from 'primevue/rating'
import firstImage from '@/assets/images/carwash.webp'
import secondImage from '@/assets/images/maintenance.webp'

const currentServiceStore = useCurrentServiceStore()
const ratingValue = ref(null)
const reviews = ref([])

const action = type => {
  console.log(type)
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
  padding: 25px 25px 75px 25px;
  background: #f7f8fa;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    width: 100%;

    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      img {
        max-height: 200px;
        width: 50%;
        border-radius: 20px;
      }
    }
    .container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 20px 0;
      gap: 10px;
      .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        .item {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 10px;
          padding: 10px 0;

          .info {
            &__label {
              color: black;
            }
          }
        }
        .item:not(:last-child) {
          border-bottom: 1px #989898 solid;
        }
      }
      .actions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;

        .action {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          cursor: pointer;
        }
      }
      .review {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: #000;
      }
      .button {
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 20px;
      }
    }
  }
}
</style>
