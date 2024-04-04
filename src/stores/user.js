import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      data: {
        firstName: '',
        roles: [],
      },
    }
  },
  actions: {
    reset() {
      this.data = {
        firstName: '',
        roles: [],
      }
    },
  },
})
