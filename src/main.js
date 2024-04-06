import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import '@/assets/css/primevue.scss'
import '@/assets/css/main.css'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './plugins/router'
import PrimeVue from 'primevue/config'
import { initializeAuth } from './plugins/axios/http/auth'
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()

initializeAuth().then(response => {
  app.use(pinia).use(PrimeVue).use(router).use(ToastService)
  const userStore = useUserStore()
  userStore.data = response?.data || {}
  app.mount('#app')
})
