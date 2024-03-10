import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const instance = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
})

export default instance
