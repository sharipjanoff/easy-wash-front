<template>
  <span class="p-float-label">
    <input-text
      :id="props.id"
      class="input"
      type="text"
      v-bind="$attrs"
      autocomplete="off"
    />
    <label :for="props.id">
      <slot v-if="inputIcon" />
      {{ props.label }}
    </label>
  </span>
</template>

<script setup>
import InputText from 'primevue/inputtext'

const props = defineProps({
  id: {
    type: String,
    default() {
      return Math.random().toString()
    },
  },
  label: {
    type: String,
    default() {
      return ''
    },
  },
  onlydigits: {
    type: Boolean,
    default() {
      return false
    },
  },
  inputIcon: {
    type: Boolean,
    default() {
      return false
    },
  },
})
</script>

<style scoped lang="scss">
.p-float-label {
  width: 300px;
  label {
    font-size: 16px;
  }
}
.input {
  width: 100%;
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #212121;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
