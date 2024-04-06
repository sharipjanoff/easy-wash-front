<template>
  <div class="otp-form">
    <div class="otp-form__item">
      <h2>Введите код отправленный вам на почту</h2>
    </div>
    <div class="otp-form__item">
      <input-otp v-model="otpValue" />
    </div>
    <div class="otp-form__item">
      <p-button @click="otpButton.action" :disabled="otpButton.disabled">
        Отправить
      </p-button>
      <p class="error" v-if="props.error.length > 0">
        {{ props.error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, markRaw, computed } from 'vue'
import InputOtp from 'primevue/inputotp'
import PButton from 'primevue/button'

const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: () => {
      return false
    },
  },
  error: {
    type: String || null,
    required: false,
    default: () => {
      return null
    },
  },
})
const emit = defineEmits(['sendRequest'])
const otpValue = ref('')

const otpButton = reactive({
  disabled: computed(() => {
    return otpValue.value.length !== 4
  }),
  action: markRaw(async () => {
    emit('sendRequest', otpValue.value)
  }),
})
</script>

<style scoped lang="scss">
.otp-form {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 21px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .error {
      color: #a20000;
    }
  }
}
</style>
