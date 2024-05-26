<template>
  <div class="manager-page">
    <div class="page-header">
      <h1 class="page-header__title">Менеджерская панель</h1>
    </div>
    <div class="item-group">
      <div class="item-group__item">
        <car-wash-list
          :loading="!carWashList"
          :data="carWashList"
          @row-click="openCarWashRowDetail($event.data)"
        />
        <Dialog
          v-model:visible="carWashDetailDialog.visible"
          :modal="true"
          header="Редактировать данные о станции обслуживания"
          style="width: 50vw"
          :breakpoints="{ '1280px': '75vw', '960px': '85vw', '640px': '95vw' }"
        >
          <car-wash-detail-dialog
            :data="carWashDetailDialog.rowData"
            :loading="carWashDetailDialog.loading"
            :error="carWashDetailDialog.error"
            @update-washing-center="
              carWashDetailDialog.updateWashingCenter($event)
            "
            @update-box="carWashDetailDialog.updateBox($event)"
          />
        </Dialog>
      </div>
    </div>
    <div class="item-group">
      <div class="item-group__item">
        <create-car-wash
          :loading="createCarWash.loading"
          :error="createCarWash.error"
          @send-request="createCarWash.action($event)"
        />
      </div>
      <div class="item-group__item">
        <create-box
          v-if="carWashList"
          :car-wash-list="carWashList"
          :loading="createBox.loading"
          :error="createBox.error"
          @send-request="createBox.action($event)"
        />
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
    <div class="item-group">
      <div class="item-group__item">
        <create-fix-box
          v-if="carWashList"
          :car-wash-list="carWashList"
          :loading="createFixBox.loading"
          :error="createFixBox.error"
          @send-request="createFixBox.action($event)"
        />
        <create-fix-price
          v-if="carWashList"
          :car-wash-list="carWashList"
          :loading="createFixPrice.loading"
          :error="createFixPrice.error"
          @send-request="createFixPrice.action($event)"
        />
      </div>
      <div class="item-group__item">
        <create-worker
          v-if="carWashList"
          :car-wash-list="carWashList"
          :loading="createWorker.loading"
          :error="createWorker.error"
          @send-request="createWorker.action($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { markRaw, onBeforeMount, reactive, ref } from 'vue'
import router from '@/plugins/router'
import { useUserStore } from '@/stores/user'
import { carsService } from '@/plugins/axios/http/cars'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import CarWashList from '@/components/manager/CarWashList.vue'
import CreateCarWash from '@/components/manager/CreateCarWash.vue'
import CreateBox from '@/components/manager/CreateBox.vue'
import CreatePrice from '@/components/manager/CreatePrice.vue'
import CarWashDetailDialog from '@/components/manager/CarWashDetailForm.vue'
import CreateFixBox from '@/components/manager/CreateFixBox.vue'
import CreateFixPrice from '@/components/manager/CreateFixPrice.vue'
import CreateWorker from '@/components/manager/CreateWorker.vue'

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
    startTime: null,
    endTime: null,
  },
  loading: false,
  error: '',
  action: markRaw(async data => {
    Object.assign(createCarWash.data, data)
    createCarWash.loading = true

    const createResponse = await carsService.createWashingCenter(
      createCarWash.data,
    )

    if (createResponse?.data?.status === 2) {
      createCarWash.error = `Ошибка при регистрации - ${createResponse?.data?.message}`
      createCarWash.loading = false
      return
    } else {
      carWashList.value = (await carsService.getMyWashingCentersList())?.data
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

    const createBoxResponse = await carsService.createBox(createBox.data)

    if (createBoxResponse?.data?.status === 2) {
      createBox.error = `Ошибка при создании бокса - ${createBoxResponse?.data?.message}`
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
const createFixBox = reactive({
  data: {
    name: null,
    washingCenterId: null,
  },
  loading: false,
  error: '',
  action: markRaw(async data => {
    Object.assign(createFixBox.data, data)
    createFixBox.loading = true

    const createFixBoxResponse = await carsService.createFixBox(
      createFixBox.data,
    )

    if (createFixBoxResponse?.data?.status === 2) {
      createFixBox.error = `Ошибка при создании бокса - ${createFixBoxResponse?.data?.message}`
      createFixBox.loading = false
      return
    } else {
      carWashList.value = (await carsService.getMyWashingCentersList())?.data
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Бокс "${createFixBox.data.name}" был создан!`,
        life: 3000,
      })
    }

    createFixBox.loading = false
  }),
})
const createPrice = reactive({
  data: {
    cost: null,
    washingCenterId: null,
    carBodyId: null,
  },
  loading: false,
  error: '',
  action: markRaw(async data => {
    Object.assign(createPrice.data, data)
    createPrice.loading = true

    const createPriceResponse = await carsService.createPrice(createPrice.data)

    if (
      createPriceResponse?.data?.status === 2 ||
      createPriceResponse?.data?.status === 500
    ) {
      createPrice.error = `Ошибка при создании цены - ${createPriceResponse?.data?.message}`
      createPrice.loading = false
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
const createFixPrice = reactive({
  data: {
    cost: null,
    washingCenterId: null,
    service: null,
  },
  loading: false,
  error: '',
  action: markRaw(async data => {
    Object.assign(createFixPrice.data, data)
    createFixPrice.loading = true

    const createFixPriceResponse = await carsService.createFixPrice(
      createFixPrice.data,
    )

    if (
      createFixPriceResponse?.data?.status === 2 ||
      createFixPriceResponse?.data?.status === 500
    ) {
      createFixPrice.error = `Ошибка при создании цены - ${createFixPriceResponse?.data?.message}`
      createFixPrice.loading = false
      return
    } else {
      carWashList.value = (await carsService.getMyWashingCentersList())?.data
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Услуга была создана!`,
        life: 3000,
      })
    }

    createPrice.loading = false
  }),
})
const createWorker = reactive({
  data: {
    firstName: null,
    lastName: null,
    phone: null,
    washingCenterId: null,
  },
  loading: false,
  error: '',
  action: markRaw(async data => {
    Object.assign(createWorker.data, data)
    createWorker.loading = true

    const createWorkerResponse = await carsService.createWorker(
      createWorker.data,
    )

    if (createWorkerResponse?.data?.status === 2) {
      createFixBox.error = `Ошибка при создании бокса - ${createWorkerResponse?.data?.message}`
      createFixBox.loading = false
      return
    } else {
      carWashList.value = (await carsService.getMyWashingCentersList())?.data
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Работник "${createWorker.data.firstName}" был создан!`,
        life: 3000,
      })
    }

    createWorker.loading = false
  }),
})
const carWashDetailDialog = reactive({
  rowData: {},
  visible: false,
  loading: false,
  error: '',
  updateWashingCenter: markRaw(async data => {
    carWashDetailDialog.loading = true

    const updateWashingCenterResponse =
      await carsService.updateWashingCenter(data)

    if (updateWashingCenterResponse?.data?.status === 2) {
      createBox.error = `Ошибка при обновлении данных - ${updateWashingCenterResponse?.data?.message}`
      createBox.loading = false
      return
    } else {
      carWashList.value = (await carsService.getMyWashingCentersList())?.data
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `${data.name} была обновлена!`,
        life: 3000,
      })
    }

    carWashDetailDialog.loading = false
  }),
  updateBox: markRaw(async data => {
    carWashDetailDialog.loading = true

    const updateBoxResponse = await carsService.updateBox({
      id: data.id,
      name: data.name,
    })

    if (updateBoxResponse?.data?.status === 2) {
      createBox.error = `Ошибка при обновлении данных - ${updateBoxResponse?.data?.message}`
      createBox.loading = false
      return
    } else {
      carWashList.value = (await carsService.getMyWashingCentersList())?.data
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Бокс - ${data.name} был обновлен!`,
        life: 3000,
      })
    }

    carWashDetailDialog.loading = false
  }),
})

const openCarWashRowDetail = rowData => {
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

  .item-group {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: nowrap;
    background: #fff;
    border-radius: 10px;

    &__item:not(:last-child) {
      border-right: 2px solid #eee;
    }

    &__item {
      align-self: flex-start;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 20px;
    }

    &__item * {
      margin-bottom: auto;
    }
  }

  .page-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
  }
}

@media screen and (max-width: 1200px) {
  .item-group {
    flex-direction: column;

    &__item {
      border-right: none;
      border-bottom: 2px solid #eee;
    }
  }
}
</style>
