<template>
  <span class="p-float-label">
    <template v-if="id.toLowerCase().includes('password')">
      <password
        :id="props.id"
        class="input"
        type="text"
        v-bind="$attrs"
        toggle-mask
        :feedback="false"
      />
    </template>
    <template v-else-if="props.isCalendar">
      <Calendar
        v-bind="$attrs"
        show-icon
        icon-display="input"
        time-only
        :id="props.id"
        class="input"
        type="text"
        hour-format="24"
      >
        <template #inputicon="{ clickCallback }">
          <InputIcon
            class="pi pi-clock cursor-pointer"
            @click="clickCallback"
          />
        </template>
      </Calendar>
    </template>
    <template v-else>
      <input-text :id="props.id" class="input" type="text" v-bind="$attrs" />
    </template>

    <label :for="props.id">
      <slot v-if="inputIcon" />
      {{ props.label }}
    </label>
  </span>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Calendar from 'primevue/calendar'
import InputIcon from 'primevue/inputicon'

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
  isCalendar: {
    type: Boolean,
    required: false,
    default: () => {
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
