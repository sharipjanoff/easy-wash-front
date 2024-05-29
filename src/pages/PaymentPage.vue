<template>
  <div class="card-page">
    <div class="page-header">
      <h1 class="page-header__title">Привязка карты</h1>
    </div>
    <div class="card-page__item" v-if="existingPayments.length > 0">
      <h2>Список ваших методов оплаты</h2>
      <template v-for="payment in existingPayments" :key="payment.id">
        <div class="existing-card">
          <i
            class="pi pi-trash existing-card__icon"
            style="font-size: 1rem; color: #fff"
            @click="deletePayment(payment.id)"
          />
          <div class="existing-card__item">
            Владелец карты - {{ payment.owner }}
          </div>
          <div class="existing-card__item">
            Номер карты -
            {{ payment.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ') }}
          </div>
          <div class="existing-card__item">
            Истекает - {{ payment.expiresDate }}
          </div>
        </div>
      </template>
    </div>
    <div class="card-page__item">
      <h2>Создать новый метод оплаты</h2>
      <card-component
        :loading="createCard.loading"
        @send-request="createCard.action($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, markRaw, onBeforeMount, reactive, ref } from 'vue'
import { carsService } from '@/plugins/axios/http/cars'
import { useToast } from 'primevue/usetoast'
import CardComponent from '@/components/payment/CardComponent.vue'

const existingPayments = ref('')
const toast = useToast()

const createCard = reactive({
  loading: false,
  error: '',
  action: markRaw(async cardData => {
    createCard.loading = true
    const createPaymentResponse = await carsService.createPayment({
      owner: cardData.cardHolder,
      cardNumber: cardData.cardNumber,
      cvv: cardData.cvv,
      expiresDate: cardData.dueDate,
    })
    if (createPaymentResponse?.data?.status === 1) {
      toast.add({
        severity: 'success',
        summary: 'Упешно!',
        detail: `Карта - ${cardData.cardNumber} была добавлена`,
        life: 3000,
      })
    } else {
      createCard.error = `Ошибка! Карта - ${cardData.cardNumber} не была добавлена`
    }
    existingPayments.value = (await carsService.getMyPayments())?.data

    createCard.loading = false
  }),
})

async function deletePayment(id) {
  await carsService.deletePayment(id)
  toast.add({
    severity: 'success',
    summary: 'Упешно!',
    detail: `Карта удалена, не забудьте добавить новую!`,
    life: 3000,
  })
  existingPayments.value = (await carsService.getMyPayments())?.data
}

onBeforeMount(async () => {
  existingPayments.value = (await carsService.getMyPayments())?.data
})
</script>

<style scoped lang="scss">
.card-page {
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

    .existing-card {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: var(--primary-color);
      color: #fff;
      padding: 20px;
      border-radius: 5px;

      &__icon {
        cursor: pointer;
        position: absolute;
        right: 3%;
        top: 5%;
      }
    }
  }
}
</style>
