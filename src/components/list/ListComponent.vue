<template>
  <div class="list-component">
    <div class="card-container">
      <template v-for="(item, index) of data" :key="index">
        <card>
          <template #header></template>
          <template #title>
            <div class="card__item">Название: {{ item.name }}</div>
          </template>
          <template #subtitle>
            <div class="card__item">Адрес: {{ item.address }}</div>
          </template>
          <template #content>
            <div class="card__item">Телефон: {{ item.number }}</div>
          </template>
          <template #footer>
            <p-button
              label="Оформить резервацию"
              @click="openReservationDialog(item)"
            />
          </template>
        </card>
      </template>
    </div>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import PButton from 'primevue/button'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const openReservationDialog = info => {
  console.log(info)
}
</script>

<style scoped lang="scss">
.list-component {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}
</style>
