import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      data: {},
    }
  },
  actions: {
    reset() {
      this.data = {}
    },
  },
})
