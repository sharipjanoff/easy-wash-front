<template>
  <div class="schedule-page">
    <div class="page-header">
      <h1 class="page-header__title">Расписание</h1>
    </div>
    <div class="schedule-page__item">
      <DataTable :value="reservations" table-style="width: 100%;">
        <template #empty> Нет активных резерваций </template>
        <template #loading> Данные загружаются, подождите... </template>
        <Column
          sortable
          field="dateTime"
          header="Дата и время"
          style="width: 25%; text-align: center"
        >
          <template #body="{ data }">
            <div class="time-card">
              <div class="time-card__item">{{ data.dateTime }}</div>
            </div>
          </template>
        </Column>
        <Column
          field="detail"
          header="Запись"
          style="width: 75%; text-align: left"
        >
          <template #body="{ data }">
            <div class="detail-card upcoming">
              <div class="detail-card__item">
                <i class="pi pi-car" style="font-size: 1rem"></i>
                <h4>
                  Машина -
                  {{
                    data.car.model + ' ' + data.car.mark + ' ' + data.car.vrp
                  }}
                </h4>
              </div>
              <div class="detail-card__item">
                <i class="pi pi-map-marker" style="font-size: 1rem"></i>
                Автомойка - {{ data.washingCenter }}
              </div>
              <div class="detail-card__item">
                <i class="pi pi-user" style="font-size: 1rem"></i>
                Работник - {{ data.carWashWorker.fio }}
              </div>
              <div class="detail-card__item">
                <i class="pi pi-phone" style="font-size: 1rem"></i>
                Номер работника - {{ data.carWashWorker.phone }}
              </div>
              <div class="detail-card__item">
                <i class="pi pi-money-bill" style="font-size: 1rem"></i>
                Цена- {{ data.carWashPrice.cost }}
              </div>
              <!--              <div class="detail-card__item">-->
              <!--                <i class="pi pi-user" style="font-size: 1rem"></i>-->
              <!--              </div>-->
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { carsService } from '@/plugins/axios/http/cars'

const reservations = ref(null)
onBeforeMount(async () => {
  reservations.value = (await carsService.getUserOrderList())?.data
})
</script>

<style scoped lang="scss">
.schedule-page {
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
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
  }
}

.time-card {
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.detail-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  height: 100%;
  width: 90%;
  padding: 10px;
  margin: 10px;

  background: var(--secondary-color);
  color: #000;
  border-radius: 10px;

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
  }
}
.upcoming {
  background: var(--primary-color);
  color: #fff;
}
</style>
