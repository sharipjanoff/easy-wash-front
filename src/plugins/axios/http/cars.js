import instance from '../index'

export const carsService = {
  createWashingCenter: async payload => {
    try {
      return await instance.post('/cars/washing-center/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  getWashingCentersList: async () => {
    try {
      return await instance.get('/cars/washing-center/list')
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  createBox: async payload => {
    try {
      return await instance.post('/cars/box/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
}
