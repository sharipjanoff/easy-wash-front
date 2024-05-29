import instance from '../index'

export const userService = {
  changePassword: async payload => {
    try {
      return await instance.post('/users/actions/change-password', payload)
    } catch (e) {
      return e.response ? e.response : null
    }
  },
}