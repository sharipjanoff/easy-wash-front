import axios from 'axios'
import config from '@/utils/config'

const BACKEND_URL = config('ENV_BACKEND_URL')

export const instance = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
})

export default instance
