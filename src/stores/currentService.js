import { defineStore } from 'pinia'

export const useCurrentServiceStore = defineStore('currentService', {
  state: () => {
    return {
      data: {},
    }
  },
})
