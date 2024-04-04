import { defineStore } from 'pinia'

export const useCurrentMapPositionStore = defineStore('currentMapPosition', {
  state: () => {
    return {
      coordinates: [],
    }
  },
})
