import instance from '../index'

export const carsService = {
  createWashingCenter: async payload => {
    try {
      return await instance.post('/cars/washing-center/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
}
