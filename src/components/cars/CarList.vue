<template>
  <div class="car-list">
    <h2>Список ваших авто</h2>
    <data-table
      :loading="!data"
      class="table"
      :value="data"
      paginator
      :rows="5"
      @row-click="emit('row-click', $event)"
    >
      <column field="mark" header="Марка"></column>
      <column field="model" header="Модель"></column>
      <column field="vrp" header="Гос Номер"></column>
    </data-table>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps({
  data: {
    type: [Array, null],
    required: true,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['row-click'])
</script>

<style scoped lang="scss">
.car-list {
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
