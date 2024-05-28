<template>
  <div class="finish-step">
    <div class="finish-step__item">
      <h2>Данные о вашей резервации</h2>
    </div>
    <template v-for="(value, key) in normalizedReservationData" :key="key">
      <div class="finish-step__item" v-if="value !== null">
        {{ keyTranslationMap[key] }} - {{ value }}
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  reservationData: {
    type: [Object, null],
    required: true,
    default: () => {
      return null
    },
  },
})
const normalizedReservationData = {
  date: props.reservationData?.normalizedDate,
  selectedCar:
    props.reservationData?.selectedCar.model +
    ' ' +
    props.reservationData?.selectedCar.mark +
    ' ' +
    props.reservationData?.selectedCar.vrp,
  washingCenterName: props.reservationData?.washingCenter.name,
  washingCenterAddress: props.reservationData?.washingCenter.location,
  washingCenterBox: props.reservationData?.selectedWashBox?.name || null,
  washingCenterFixBox: props.reservationData?.selectedFixBox?.name || null,
  washingCenterWorker: props.reservationData?.selectedWorker.fio,
  selectedFix: props.reservationData?.selectedFix?.ruName || null,
}
const keyTranslationMap = {
  date: 'Дата и время',
  selectedCar: 'Выбранная вами машина',
  washingCenterName: 'Название автомойки',
  washingCenterAddress: 'Адрес автомойки',
  washingCenterBox: 'Название бокса мойки',
  washingCenterFixBox: 'Название бокса тех обслуживания',
  washingCenterWorker: 'ФИО работника',
  selectedFix: 'Выбранная услуга',
}
</script>

<style scoped lang="scss">
.finish-step {
  width: 100%;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 30px;
    border-radius: 10px;
    background: #fff;
    width: 100%;
    font-size: 16px;
  }
}
</style>
