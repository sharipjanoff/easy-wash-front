<template>
  <div class="card-component">
    <div class="card">
      <div class="card-header">
        <h2>Кредитная/Дебитовая Карта</h2>
      </div>
      <div class="card-body">
        <div class="card-number">
          <label for="cardNumber">Номер Карты</label>
          <input
            :value="formattedCardNumber"
            @input="handleCardNumberInput"
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxlength="19"
          />
        </div>
        <div class="card-holder">
          <label for="cardHolder">Владелец Карты (латиницей)</label>
          <input
            v-model="cardData.cardHolder"
            id="cardHolder"
            type="text"
            placeholder="Имя владельца"
          />
        </div>
        <div class="card-details">
          <div class="due-date">
            <label for="dueDate">Срок годности</label>
            <input
              :value="formattedDueDate"
              @input="handleDueDateInput"
              id="dueDate"
              type="text"
              placeholder="MM/YY"
              maxlength="5"
            />
          </div>
          <div class="cvv">
            <label for="cvv">Трехнззначный CVV на обороте</label>
            <input
              v-model="cardData.cvv"
              id="cvv"
              type="text"
              placeholder="123"
              maxlength="3"
            />
          </div>
        </div>
      </div>
    </div>
    <p-button
      type="button"
      @click.prevent="button.action($event)"
      :disabled="button.disabled"
      :loading="loading"
    >
      Привязать
    </p-button>
    <p class="error" v-if="error.length > 0">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, reactive, markRaw } from 'vue'
import PButton from 'primevue/button'

const props = defineProps({
  loading: {
    type: [Boolean, null],
    required: false,
    default: () => {
      return null
    },
  },
  error: {
    type: String,
    required: false,
    default: () => {
      return ''
    },
  },
})
const emit = defineEmits(['sendRequest'])
const cardData = reactive({
  cardNumber: '',
  cardHolder: '',
  dueDate: '',
  cvv: '',
})

const button = reactive({
  disabled: computed(() => {
    return (
      cardData.cardHolder.length === 0 ||
      cardData.cardNumber.length === 0 ||
      cardData.dueDate.length === 0 ||
      cardData.cvv.length === 0
    )
  }),
  action: markRaw(async () => {
    emit('sendRequest', cardData)
  }),
})

const handleCardNumberInput = event => {
  const input = event.target.value.replace(/\s+/g, '')
  cardData.cardNumber = input
}

const handleDueDateInput = event => {
  const input = event.target.value.replace(/\//g, '')
  if (input.length <= 2) {
    cardData.dueDate = input
  } else {
    cardData.dueDate = `${input.slice(0, 2)}/${input.slice(2, 4)}`
  }
}

const formattedCardNumber = computed(() => {
  return cardData.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
})

const formattedDueDate = computed(() => {
  return cardData.dueDate.replace(/(\d{2})(?=\d)/, '$1/')
})
</script>

<style scoped lang="scss">
.card-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  background: #fff;

  .card {
    width: 450px;
    height: 280px;
    background-color: var(--primary-color);
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    color: #fff;

    &-header {
      text-align: center;
      margin-bottom: 20px;
    }

    &-body {
      display: flex;
      flex-direction: column;

      div {
        margin-bottom: 10px;
      }
    }
  }

  label {
    font-size: 12px;
    margin-bottom: 5px;
    display: block;
  }

  input {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    font-size: 14px;
  }

  .card-details {
    display: flex;
    justify-content: space-between;

    .due-date,
    .cvv {
      width: 45%;
    }
  }
}

@media screen and (max-width: 650px) {
  .card {
    width: 300px !important;
  }
}
</style>
