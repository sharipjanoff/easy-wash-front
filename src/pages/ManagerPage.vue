<template>
  <div class="manager-page">
    <div class="page-header">
      <h1 class="page-header__title">Менеджерская панель</h1>
    </div>
    <div class="manager-page__item">
      <car-wash-list :data="carWashList" v-if="carWashList" />
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
        :loading="createBox.loading"
        :error="createBox.error"
        @send-request="createBox.action($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { markRaw, onBeforeMount, reactive, ref } from 'vue'
import router from '@/plugins/router'
import { useUserStore } from '@/stores/user'
import { carsService } from '@/plugins/axios/http/cars'
import CarWashList from '@/components/manager/CarWashList.vue'
import CreateCarWash from '@/components/manager/CreateCarWash.vue'
import CreateBox from '@/components/manager/CreateBox.vue'
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const toast = useToast()
const carWashList = ref(null)
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
  action: markRaw(data => {
    Object.assign(createBox.data, data)
    createBox.loading = true

    const createBoxResponse = carsService.createWashingCenter(createBox.data)

    if (createBoxResponse?.data?.status === 2) {
      createBox.error = `Ошибка при создании бокса - ${createBox?.data?.message}`
      createBox.loading = false
      return
    } else {
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

onBeforeMount(async () => {
  if (!userStore.data.roles.includes('EMPLOYEE')) {
    router.push('/')
  }
  carWashList.value = (await carsService.getWashingCentersList())?.data
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
