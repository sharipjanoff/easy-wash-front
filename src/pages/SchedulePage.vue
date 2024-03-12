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
          field="time"
          header="Время"
          style="width: 25%; text-align: center"
        >
          <template #body="{ data }">
            <div class="time-card">
              <div class="time-card__item">{{ data.time.start }}</div>
              <div class="time-card__item">{{ data.time.end }}</div>
            </div>
          </template>
        </Column>
        <Column
          field="detail"
          header="Запись"
          style="width: 75%; text-align: left"
        >
          <template #body="{ data }">
            <div
              class="detail-card"
              :class="{ upcoming: reservations.indexOf(data) === 0 }"
            >
              <div class="detail-card__item">
                <h4>
                  {{ data.detail.service }}
                </h4>
              </div>
              <div class="detail-card__item">
                {{ data.detail.name }}
              </div>
              <br />
              <div class="detail-card__item">
                <i class="pi pi-map-marker" style="font-size: 1rem"></i>
                {{ data.detail.address }}
              </div>
              <div class="detail-card__item">
                <i class="pi pi-user" style="font-size: 1rem"></i>

                {{ data.detail.worker }}
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const reservations = reactive([
  {
    time: {
      start: '11:00',
      end: '12:00',
    },
    detail: {
      name: 'Навигатор',
      address: 'Пушкина д. 2',
      service: 'Мойка',
      worker: 'Сергей',
    },
  },
  {
    time: {
      start: '13:00',
      end: '12:00',
    },
    detail: {
      name: 'Навигатор',
      address: 'Пушкина д. 2',
      service: 'Мойка',
      worker: 'Сергей',
    },
  },
])
</script>

<style scoped lang="scss">
.schedule-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px 25px 75px 25px;
  background: #f7f8fa;

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
  height: 100%;
  width: 90%;
  padding: 10px;
  margin: 10px;

  background: var(--secondary-color);
  color: #000;
  border-radius: 10px;
}
.upcoming {
  background: var(--primary-color);
  color: #fff;
}
</style>
