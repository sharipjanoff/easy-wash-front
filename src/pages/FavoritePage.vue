<template>
  <div class="favorite-page">
    <div class="page-header">
      <h1 class="page-header__title">Список избранных</h1>
    </div>
    <template v-if="favoritesList">
      <template v-for="item in favoritesList" :key="item.id">
        <div class="favorite-page__item">
          <div>Название - {{ item.name }}</div>
          <div>Адрес - {{ item.location }}</div>
          <div>Номер телефона: {{ item.phone }}</div>
          <div>Время работы: {{ item.startTime }} - {{ item.endTime }}</div>
          <panel
            v-if="item.carWashPrice.length > 0"
            header="Стоимость услуг автомойки"
            toggleable
            :collapsed="true"
          >
            <template
              v-for="carWashItem in item.carWashPrice"
              :key="carWashItem.id"
            >
              <div>
                {{ carWashItem.carBody.ruName }}: {{ carWashItem.cost }} тенге
              </div>
            </template>
          </panel>
          <panel
            v-if="item.carFixes.length > 0"
            header="Стоимость услуг СТО"
            toggleable
            :collapsed="true"
          >
            <template v-for="carFixItem in item.carFixes" :key="carFixItem.id">
              <div>{{ carFixItem.ruName }}: {{ carFixItem.cost }} тенге</div>
            </template>
          </panel>
          <p-button
            label="Перейти на страницу автомойки"
            @click="openReservationPage(item)"
          />
        </div>
      </template>
    </template>
    <template v-else>
      <div class="favorite-page__item">
        <img :src="favoritesSvg" alt="Favorites Svg" />
        <h3>В избранном пока ничего нет</h3>
        <p>Выберите понравившийся автомойку и добавьте сюда</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import router from '@/plugins/router'
import { carsService } from '@/plugins/axios/http/cars'
import { useCurrentServiceStore } from '@/stores/currentService'
import favoritesSvg from '@/assets/icons/favorites.svg'
import Panel from 'primevue/panel'
import PButton from 'primevue/button'

const currentService = useCurrentServiceStore()
const favoritesList = ref(null)

const openReservationPage = info => {
  currentService.data = info
  router.push('/reservation')
}

onMounted(async () => {
  favoritesList.value = (await carsService.getFavoriteCarWash())?.data
})
</script>

<style scoped lang="scss">
.favorite-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
  background: #f7f8fa;
  overflow-y: scroll;

  .page-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;

    h3 {
      weight: 600;
      font-size: 17px;
      line-height: 22px;
    }
    p {
      color: #989898;
      font-size: 16px;
      line-height: 23px;
    }
  }
}
</style>
