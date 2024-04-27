<template>
  <div class="cars-page">
    <div class="page-header">
      <h1 class="page-header__title">Ваши машины</h1>
    </div>
    <div class="cars-page__item">
      <car-list :data="carList" @row-click="openCarDetail($event.data)" />
      <Dialog
        v-model:visible="carDetailDialog.visible"
        :modal="true"
        header="Редактировать данные об авто"
        style="width: 50vw"
        :breakpoints="{ '1280px': '75vw', '960px': '85vw', '640px': '95vw' }"
      >
        <car-detail-form
          :data="carDetailDialog.rowData"
          :loading="carDetailDialog.loading"
          :error="carDetailDialog.error"
          :car-body-list="carBodyList"
          @update-car="carDetailDialog.updateCar($event)"
        />
      </Dialog>
    </div>
    <div class="cars-page__item">
      <car-form
        :loading="carForm.loading"
        :error="carForm.error"
        :car-body-list="carBodyList"
        @send-request="carForm.handleRequest($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { markRaw, onBeforeMount, reactive, ref } from 'vue'
import { carsService } from '@/plugins/axios/http/cars'
import Dialog from 'primevue/dialog'
import CarForm from '@/components/cars/CarForm.vue'
import CarList from '@/components/cars/CarList.vue'
import CarDetailForm from '@/components/cars/CarDetailForm.vue'
import { useToast } from 'primevue/usetoast'

const carList = ref(null)
const carBodyList = ref(null)
const toast = useToast()

const carForm = reactive({
  data: {
    vrp: null,
    model: null,
    mark: null,
    color: null,
    carBodyId: null,
  },
  loading: false,
  error: '',
  handleRequest: markRaw(async data => {
    Object.assign(carForm.data, data)
    carForm.loading = true
    const createCarBodyResponse = await carsService.createCar(data)
    console.log(createCarBodyResponse)
    if (createCarBodyResponse?.data?.status === 1) {
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Машина- ${carForm.data?.model} ${carForm.data?.mark}  была создана`,
        life: 3000,
      })
    } else {
      carForm.error = `Ошибка! Машина - ${carForm.data?.model} ${carForm.data?.mark} не была создана`
    }
    carForm.loading = false
  }),
})

const carDetailDialog = reactive({
  rowData: {},
  visible: false,
  loading: false,
  error: '',
  updateCar: markRaw(async data => {
    console.log(data)
    carDetailDialog.loading = true

    const updateWashingCenterResponse = await carsService.updateCar(data)

    if (carDetailDialog?.data?.status === 2) {
      carDetailDialog.error = `Ошибка при обновлении данных - ${updateWashingCenterResponse?.data?.message}`
      carDetailDialog.loading = false
      return
    } else {
      carList.value = (await carsService.getMyCarList())?.data
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Машина ${data.model} ${data.mark} была обновлена!`,
        life: 3000,
      })
    }

    carDetailDialog.loading = false
    carDetailDialog.visible = false
  }),
})

const openCarDetail = rowData => {
  carDetailDialog.rowData = rowData
  carDetailDialog.visible = true
}

onBeforeMount(async () => {
  carList.value = (await carsService.getMyCarList())?.data
  carBodyList.value = (await carsService.getCarBodyList())?.data
})
</script>

<style scoped lang="scss">
.cars-page {
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
  }
}
</style>
