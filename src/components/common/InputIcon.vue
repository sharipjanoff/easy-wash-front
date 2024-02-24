<template>
  <div class="input-icon">
    <input-text class="input" v-bind="$attrs" />
    <i
      class="icon"
      :class="`pi pi-${icon}`"
      style="font-size: 1.5rem; color: var(--primary-color)"
    ></i>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'

const props = defineProps({
  icon: {
    type: String,
    required: false,
  },
})
</script>

<style scoped lang="scss">
.input-icon {
  position: relative;

  .input {
    width: 100%;
  }

  .icon {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
