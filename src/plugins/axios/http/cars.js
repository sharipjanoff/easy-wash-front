import instance from '../index'

export const carsService = {
  createWashingCenter: async payload => {
    try {
      return await instance.post('/cars/washing-center/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  updateWashingCenter: async payload => {
    try {
      return await instance.put(
        `/cars/washing-center/edit/${payload.id}`,
        payload,
      )
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
  addCarWashToFavorites: async payload => {
    try {
      return await instance.post(`/cars/washing-center/favorite/${payload.id}`)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  getFavoriteCarWash: async () => {
    try {
      return await instance.get('/cars/washing-center/favorite')
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  deleteFavoriteCarWash: async payload => {
    try {
      return await instance.delete('/cars/washing-center/favorite', payload)
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
  createFixBox: async payload => {
    try {
      return await instance.post('/cars/fix-box/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  updateBox: async payload => {
    try {
      return await instance.put(`/cars/box/edit/${payload.id}`, payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  getBoxesByWashingCenterId: async payload => {
    try {
      return await instance.get(`/cars/box/list/${payload.id}`, payload)
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
  createFixPrice: async data => {
    const payload = {
      type: 'a',
      ruName: data.service,
      washingCenterId: data.washingCenterId,
      cost: data.cost,
    }
    try {
      return await instance.post('/cars/car-fix/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  getPriceById: async payload => {
    try {
      return await instance.get(
        `/cars/price/by-carbody-washingcenter/${payload.washingCenterId}/${payload.carBodyId}`,
      )
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
  getMyCarList: async () => {
    try {
      return await instance.get('/cars/list')
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  createCar: async payload => {
    try {
      return await instance.post('/cars/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  updateCar: async payload => {
    try {
      return await instance.put(`/cars/edit/${payload.id}`, payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  createOrder: async payload => {
    try {
      return await instance.post('cars/order/create', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  getUserOrderList: async () => {
    try {
      return await instance.get('cars/order/my/')
    } catch (e) {
      return e.response ? e.response : null
    }
  },
}
