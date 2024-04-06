import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const token = `Bearer ${localStorage.getItem('token')}`

export const instance = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
})

if (!token.includes('null')) {
  instance.defaults.headers.common.Authorization = token
}

export default instance
