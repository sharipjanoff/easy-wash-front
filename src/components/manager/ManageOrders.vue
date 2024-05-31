<template>
  <div class="manage-orders">
    <div class="manage-orders__item" v-show="washingCenterIds">
      <h2>Выберите автомойку</h2>
      <p-dropdown
        v-model="selectedWashingCenter"
        :options="washingCenterIds"
        option-label="name"
        placeholder="Выберите станцию"
        style="width: 300px; text-align: left"
      />
    </div>
    <div class="manage-orders__item" v-show="selectedWashingCenter">
      <h2>Выберите дату</h2>
      <calendar v-model="date" inline :min-date="today" />
    </div>
    <div class="manage-orders__item" v-show="selectedWashingCenter && date">
      <template v-for="(value, key) in orderList.data" :key="key">
        <template v-if="value">
          {{ key }}
          <data-table
            class="table"
            :value="value"
            paginator
            :rows="5"
            @row-click="openOrderDetailDialog"
          >
            <template #empty> Записей не найдено.. </template>
            <column field="car" header="Машина">
              <template #body="slotProps">
                {{ slotProps.data.car.mark }} {{ slotProps.data.car.model }}
                {{ slotProps.data.car.vrp }}
              </template>
            </column>
            <column field="worker" header="Работник">
              <template #body="slotProps">
                {{ slotProps.data.carWashWorker.fioShort }}
              </template>
            </column>
            <column field="service" header="Вид услуги">
              <template #body="slotProps">
                {{ slotProps.data?.carFix?.ruName || 'Мойка' }}
              </template>
            </column>
            <column field="price" header="Цена">
              <template #body="slotProps">
                {{
                  slotProps.data?.carFix?.cost ||
                  slotProps.data?.carWashPrice?.cost
                }}
              </template>
            </column>
          </data-table>
        </template>
        <template v-else>Записей не найдено...</template>
      </template>
      <Dialog
        v-model:visible="orderListDialog.visible"
        :modal="true"
        header="Редактировать данные о заказе"
        style="width: 50vw"
        :breakpoints="{
          '1280px': '75vw',
          '960px': '85vw',
          '640px': '95vw',
        }"
      >
        <div class="order-detail">
          <div class="order-detail__item">
            <p-dropdown
              v-model="selectedStatus"
              :options="statusOptions"
              option-label="name"
              placeholder="Поменять статус"
              style="width: 300px; text-align: left"
            />
          </div>
          <div class="order-detail__item">
            <p-button
              @click="orderListDialog.update(orderListDialog.rowData.data)"
              >Обновить статус</p-button
            >
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive, markRaw } from 'vue'
import { carsService } from '@/plugins/axios/http/cars'
import Calendar from 'primevue/calendar'
import PDropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import PButton from 'primevue/button'

const props = defineProps({
  washingCenterList: {
    type: Array,
    required: false,
    default: () => {
      return []
    },
  },
})

const washingCenterIds = ref([])
const today = ref(new Date())
const date = ref(new Date())
const selectedWashingCenter = ref(null)
const orderList = reactive({
  loading: false,
  data: {},
})
const orderListDialog = reactive({
  rowData: {},
  visible: false,
  loading: false,
  error: '',
  update: markRaw(async data => {
    if (data?.carFix) {
      await carsService.updateFixOrderStatus({
        id: data.id,
        status: JSON.stringify(selectedStatus.value.status),
      })
    } else {
      await carsService.updateOrderStatus({
        id: data.id,
        status: JSON.stringify(selectedStatus.value.status),
      })
    }
    console.log(data)
  }),
})
const statusOptions = [
  {
    name: 'Создан',
    status: 'CREATED',
  },
  {
    name: 'В процессее',
    status: 'PROCESS',
  },
  {
    name: 'Закончен',
    status: 'FINISHED',
  },
  {
    name: 'Отменен',
    status: 'CANCELED',
  },
]
const selectedStatus = ref(null)

function setSelectedStatus(data, statusOptions, selectedStatus) {
  const foundStatus = statusOptions.find(
    option => option.status === data.status,
  )
  if (foundStatus) {
    selectedStatus.value = foundStatus
  }
}

const openOrderDetailDialog = rowData => {
  orderListDialog.rowData = rowData
  orderListDialog.visible = true
  selectedStatus.value = orderListDialog.rowData.data.status
  setSelectedStatus(orderListDialog.rowData.data, statusOptions, selectedStatus)
}

function normalizeDate(dateInput) {
  const dateString = `${dateInput}`
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

async function getOrders() {
  const orders = {}
  orders.carWashOrders = (
    await carsService.getOrderListFull({
      id: selectedWashingCenter.value.id,
      date: normalizeDate(date.value),
    })
  )?.data
  orders.carFixOrders = (
    await carsService.getFixOrderListFull({
      id: selectedWashingCenter.value.id,
      date: normalizeDate(date.value),
    })
  )?.data
  orderList.data = unpackOrders(orders)
}

function unpackOrders(data) {
  const result = {}

  // Process carWashOrders
  if (data.carWashOrders) {
    for (const [key, value] of Object.entries(data.carWashOrders)) {
      result[key] = value
    }
  }

  // Process carFixOrders
  if (data.carFixOrders) {
    for (const [key, value] of Object.entries(data.carFixOrders)) {
      if (result[key]) {
        result[key] = result[key].concat(value)
      } else {
        result[key] = value
      }
    }
  }

  return result
}

watch(selectedWashingCenter, async () => {
  if (date.value) {
    await getOrders()
  }
})
watch(date, async () => {
  if (selectedWashingCenter.value) {
    await getOrders()
  }
})
watch(
  () => props.washingCenterList,
  newList => {
    washingCenterIds.value = newList.map(item => ({
      id: item.id,
      name: item.name,
    }))
  },
)
</script>

<style scoped lang="scss">
.manage-orders {
  width: 100%;
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.order-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
}
</style>
