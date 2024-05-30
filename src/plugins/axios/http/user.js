import instance from '../index'

export const userService = {
  changePassword: async payload => {
    try {
      return await instance.post('/users/actions/change-password', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  editUser: async payload => {
    try {
      return await instance.put('/users/', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
  updateAvatar: async id => {
    try {
      return await instance.put(`users/avatar/${id}`)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
}
