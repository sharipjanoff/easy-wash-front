<template>
  <div class="car-wash-list">
    <h2>Список ваших станций обслуживания</h2>
    <data-table
      :loading="props.loading"
      class="table"
      :value="data"
      paginator
      :rows="5"
      @row-click="emit('row-click', $event)"
    >
      <column field="name" header="Название"></column>
      <column field="location" header="Адрес"></column>
      <column field="phone" header="Телефон"></column>
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
  loading: {
    type: Boolean,
    required: true,
    default: () => {
      return false
    },
  },
})
const emit = defineEmits(['row-click'])
</script>

<style scoped lang="scss">
.car-wash-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  gap: 20px;
  width: 100%;

  .table {
    width: 100%;
    overflow-x: scroll;
  }
}
</style>
