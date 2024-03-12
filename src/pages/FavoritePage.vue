<template>
  <div class="favorite-page">
    <template v-if="favoritesList.length > 0">
      <div class="favorite-page__item">Here will be list</div>
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
import { ref } from 'vue'
import favoritesSvg from '@/assets/icons/favorites.svg'

const favoritesList = ref([])
</script>

<style scoped lang="scss">
.favorite-page {
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
