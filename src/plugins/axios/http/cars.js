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
  getMyWashingCentersList: async () => {
    try {
      return await instance.get('/cars/washing-center/list-my')
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
  createPrice: async payload => {
    try {
      return await instance.post('/cars/price/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  createCarBody: async payload => {
    try {
      return await instance.post('/cars/carbody/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  getCarBodyList: async () => {
    try {
      return await instance.get('/cars/carbody/list')
    } catch (e) {
      return e.response ? e.response : null
    }
  },
}
