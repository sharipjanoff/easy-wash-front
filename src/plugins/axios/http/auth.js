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
    const payload = new URLSearchParams({
      username: data.email,
      password: data.password,
      grant_type: 'password',
    })
    try {
      return await instance.post('/uaa/oauth/token', payload, {
        auth: {
          username: 'browser',
          password: '',
        },
      })
    } catch (e) {
      return e.response
    }
  },
  sendOtp: async data => {
    const payload = {
      email: data.email,
    }
    try {
      return await instance.post('/users/actions/generate-code', payload)
    } catch (e) {
      return e.response
    }
  },
  verifyOtp: async data => {
    const payload = {
      token: `${data.id}:${data.otp}`,
    }
    try {
      return await instance.post('/users/actions/email-verify', payload)
    } catch (e) {
      return e.response
    }
  },
  getCurrentUser: async () => {
    try {
      return await instance.get('/users/current')
    } catch (e) {
      return e.response
    }
  },
}
