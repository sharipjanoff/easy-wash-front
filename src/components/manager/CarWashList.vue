<template>
  <div class="car-wash-list">
    <h2>Список ваших автомоек</h2>
    <data-table class="table" :value="data" paginator :rows="5">
      <column field="name" header="Название"></column>
      <column field="location" header="Адрес"></column>
      <column field="lat" header="Долгота"></column>
      <column field="lon" header="Широта"></column>
      <column field="phone" header="Телефон"></column>
      <column field="id" header="Айди автомойки"></column>
    </data-table>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => {
      return []
    },
  },
})
</script>

<style scoped lang="scss">
.car-wash-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  .table {
    width: 100%;
    overflow-x: scroll;
  }
}
</style>
