import instance from '../index'

export const authService = {
  signUp: async data => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      type: 'CLIENT',
    }
    return await instance.post('/users/registration', payload)
  },
}
