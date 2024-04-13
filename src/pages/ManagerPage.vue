<template>
  <div class="manager-page">
    <div class="page-header">
      <h1 class="page-header__title">Менеджерская панель</h1>
    </div>
    <div class="manager-page__item">
      <car-wash-list
        :loading="!carWashList"
        :data="carWashList"
        @row-click="openRowDetail($event.data)"
      />
      <Dialog
        v-model:visible="carWashDetailDialog.visible"
        :modal="true"
        header="Редактировать данные об автомойке"
        style="width: 50vw"
        :breakpoints="{ '1280px': '75vw', '960px': '85vw', '640px': '95vw' }"
      >
        <car-wash-detail-dialog
          :data="carWashDetailDialog.rowData"
          :loading="carWashDetailDialog.loading"
          :error="carWashDetailDialog.error"
          @send-request="carWashDetailDialog.action($event)"
        />
      </Dialog>
    </div>
    <div class="manager-page__item">
      <create-car-wash
        :loading="createCarWash.loading"
        :error="createCarWash.error"
        @send-request="createCarWash.action($event)"
      />
    </div>
    <div class="manager-page__item">
      <create-box
        v-if="carWashList"
        :car-wash-list="carWashList"
        :loading="createBox.loading"
        :error="createBox.error"
        @send-request="createBox.action($event)"
      />
    </div>
    <div class="manager-page__item">
      <create-price
        v-if="carWashList && carBodyList"
        :car-wash-list="carWashList"
        :car-body-list="carBodyList"
        :loading="createPrice.loading"
        :error="createPrice.error"
        @send-request="createPrice.action($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { markRaw, onBeforeMount, reactive, ref } from 'vue'
import router from '@/plugins/router'
import { useUserStore } from '@/stores/user'
import { carsService } from '@/plugins/axios/http/cars'
import Dialog from 'primevue/dialog'
import CarWashList from '@/components/manager/CarWashList.vue'
import CreateCarWash from '@/components/manager/CreateCarWash.vue'
import CreateBox from '@/components/manager/CreateBox.vue'
import CreatePrice from '@/components/manager/CreatePrice.vue'
import CarWashDetailDialog from '@/components/manager/CarWashDetailForm.vue'
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const toast = useToast()
const carWashList = ref([])
const carBodyList = ref([])
const createCarWash = reactive({
  data: {
    name: null,
    location: null,
    lon: null,
    lat: null,
    phone: null,
    description: null,
  },
  loading: false,
  error: '',
  action: markRaw(data => {
    Object.assign(createCarWash.data, data)
    createCarWash.loading = true

    const createResponse = carsService.createWashingCenter(createCarWash.data)

    if (createResponse?.data?.status === 2) {
      createCarWash.error = `Ошибка при регистрации - ${createResponse?.data?.message}`
      createCarWash.loading = false
      return
    } else {
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Автомойка "${createCarWash.data.name}" была создана!`,
        life: 3000,
      })
    }

    createCarWash.loading = false
  }),
})
const createBox = reactive({
  data: {
    name: null,
    washingCenterId: null,
  },
  loading: false,
  error: '',
  action: markRaw(async data => {
    Object.assign(createBox.data, data)
    createBox.loading = true

    const createBoxResponse = carsService.createBox(createBox.data)

    if (createBoxResponse?.data?.status === 2) {
      createBox.error = `Ошибка при создании бокса - ${createBox?.data?.message}`
      createBox.loading = false
      return
    } else {
      carWashList.value = (await carsService.getMyWashingCentersList())?.data
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Бокс "${createBox.data.name}" был создан!`,
        life: 3000,
      })
    }

    createBox.loading = false
  }),
})
const createPrice = reactive({
  data: {
    cost: null,
    washingCenterId: null,
    carBodyTypeId: null,
  },
  loading: false,
  error: '',
  action: markRaw(async data => {
    Object.assign(createPrice.data, data)
    console.log(createPrice.data)
    createPrice.loading = true

    const createPriceResponse = carsService.createPrice(createPrice.data)

    if (createPriceResponse?.data?.status === 2) {
      createBox.error = `Ошибка при создании цены - ${createPriceResponse?.data?.message}`
      createBox.loading = false
      return
    } else {
      carWashList.value = (await carsService.getMyWashingCentersList())?.data
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Цена была установлена!`,
        life: 3000,
      })
    }

    createPrice.loading = false
  }),
})
const carWashDetailDialog = reactive({
  rowData: {},
  visible: false,
  loading: false,
  error: '',
  action: markRaw(data => {
    console.log(data)
  }),
})

const openRowDetail = rowData => {
  carWashDetailDialog.rowData = rowData
  carWashDetailDialog.visible = true
}

onBeforeMount(async () => {
  if (!userStore.data.roles.includes('EMPLOYEE')) {
    router.push('/')
  }
  carWashList.value = (await carsService.getMyWashingCentersList())?.data
  carBodyList.value = (await carsService.getCarBodyList())?.data
})
</script>

<style scoped lang="scss">
.manager-page {
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
