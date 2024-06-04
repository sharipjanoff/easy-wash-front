<template>
  <div class="information-step">
    <div class="information-step__item">
      <h1>{{ data.name }}</h1>
      <div class="image-container">
        <template v-if="data.images.length > 0">
          <template v-for="(image, key) in data.images">
            <template v-if="image !== null" :key="key">
              <img :src="image" :alt="`image${key}`" />
            </template>
            <template v-else>
              <img :src="firstImage" alt="Image 1" />
            </template>
          </template>
        </template>
        <template v-else>
          <img :src="firstImage" alt="Image 1" />
          <img :src="secondImage" alt="Image 2" />
        </template>
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
                    {{ data.location }}
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
                    {{ data.startTime }} - {{ data.endTime }}
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
                    {{ data.description }}
                  </div>
                </div>
              </div>
            </div>
            <div class="actions">
              <template v-if="isFavorite">
                <div class="action" @click="emit('action', 'favorite-delete')">
                  <div class="action__icon">
                    <i
                      class="pi pi-heart-fill"
                      style="font-size: 2rem; color: lightsalmon"
                    ></i>
                  </div>
                  <div class="actions__label">Удалить из избранного</div>
                </div>
              </template>
              <template v-else>
                <div class="action" @click="emit('action', 'favorite-add')">
                  <div class="action__icon">
                    <i class="pi pi-heart" style="font-size: 2rem"></i>
                  </div>
                  <div class="actions__label">Добавить в избранное</div>
                </div>
              </template>
              <div class="action" @click="emit('action', 'map')">
                <div class="action__icon">
                  <i class="pi pi-map" style="font-size: 2rem"></i>
                </div>
                <div class="actions__label">Открыть на карте</div>
              </div>
            </div>
            <p-button
              @click="emit('start-reservation')"
              class="button"
              label="Записаться"
            />
          </div>
        </tab-panel>
        <tab-panel header="Отзывы">
          <div class="container">
            <div class="review">
              <h2>Оцените это место</h2>
              <rating v-model="ratingData.rating" :stars="10" :cancel="false" />
              <input-float
                v-model="ratingData.commentary"
                id="review"
                label="Комментарий"
              />
              <p-button
                @click="emit('rate', ratingData)"
                label="Оставить отзыв"
              ></p-button>
            </div>
            <div v-if="reviews" class="review-list">
              <template v-for="(review, idx) in reviews" :key="idx">
                <div class="review-list__item">
                  <div>№ {{ idx + 1 }} - {{ review.userFio }}</div>
                  <div>Оценка: {{ review.rating }}/10</div>
                  <div>Комментарий: {{ review.review }}</div>
                </div>
              </template>
            </div>
          </div>
        </tab-panel>
      </tab-view>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { carsService } from '@/plugins/axios/http/cars'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import PButton from 'primevue/button'
import Rating from 'primevue/rating'
import firstImage from '@/assets/images/carwash.webp'
import secondImage from '@/assets/images/maintenance.webp'
import InputFloat from '@/components/common/InputFloat.vue'
import { userService } from '../../plugins/axios/http/user'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: [Boolean, null],
    required: false,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['action', 'rate', 'start-reservation'])

const ratingData = reactive({
  rating: null,
  commentary: null,
})
const reviews = ref(null)

async function getReviewList() {
  const reviewsResponse = (await carsService.getReviews({ id: props.data.id }))
    ?.data
  for (let i = 0; i < reviewsResponse.length; i++) {
    const userId = reviewsResponse[i].userId
    const userInfo = (await userService.getUserById(userId))?.data
    const userFio = userInfo.fio
    reviewsResponse[i].userFio = userFio
  }
  reviews.value = reviewsResponse
}

onBeforeMount(async () => {
  await getReviewList()
})
</script>

<style scoped lang="scss">
.information-step {
  width: 100%;
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
        gap: 20px;
        color: #000;
      }
      .review-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 20px;
        color: #000;

        &__item {
          width: 100%;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--primary-color);
        }
      }
      .button {
        align-self: center;
        width: 300px;
        max-width: 100%;
        height: 40px;
        text-align: center;
        font-size: 20px;
      }
    }
  }
}
</style>
