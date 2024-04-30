<template>
  <div class="favorite-page">
    <div class="page-header">
      <h1 class="page-header__title">Список избранных</h1>
    </div>
    <template v-if="favoritesList">
      <template v-for="item in favoritesList">
        <div class="favorite-page__item">{{ item }}</div>
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
import { carsService } from '@/plugins/axios/http/cars'
import favoritesSvg from '@/assets/icons/favorites.svg'

const favoritesList = ref(null)

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
    align-items: center;
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
