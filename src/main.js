import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VOtpInput from 'vue3-otp-input'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import '@/assets/css/primevue.scss'
import '@/assets/css/main.css'

import App from './App.vue'
import router from './plugins/router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(createPinia()).use(PrimeVue).use(router)
app.component('VOtpInput', VOtpInput)
app.mount('#app')
