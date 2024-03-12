import instance from '../index'

export const authService = {
  signUp: async data => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      type: 'CLIENT',
      phone: data.phone,
    }
    try {
      return await instance.post('/users/registration', payload)
    } catch (e) {
      return e.response
    }
  },
  signIn: async data => {
    const payload = {
      username: data.email,
      password: data.password,
      grant_type: 'password',
    }
    try {
      return await instance.post('/uaa/oauth/token', payload)
    } catch (e) {
      return e.response
    }
  },
}
