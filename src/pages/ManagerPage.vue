<template>
  <div class="manager-page">
    <div class="page-header">
      <h1 class="page-header__title">Менеджерская панель</h1>
    </div>
    <tab-view>
      <tab-panel header="Основной функционал">
        <main-functionality @car-wash-list-update="updateWashingCenterList" />
      </tab-panel>
      <tab-panel header="Управление заказами">
        <manage-orders :washing-center-list="washingCenterList" />
      </tab-panel>
    </tab-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import MainFunctionality from '@/components/manager/MainFunctionality.vue'
import ManageOrders from '@/components/manager/ManageOrders.vue'

const washingCenterList = ref(null)

const updateWashingCenterList = data => {
  washingCenterList.value = data
}
</script>

<style scoped lang="scss">
.manager-page {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 25px 25px 25px;
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
}
</style>
