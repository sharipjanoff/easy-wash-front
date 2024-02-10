import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'primevue/resources/themes/saga-green/theme.css'
import 'primeicons/primeicons.css'
import '@/assets/css/primevue.scss'
import '@/assets/css/main.css'

import App from './App.vue'
import router from './plugins/router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(createPinia()).use(PrimeVue).use(router)
app.mount('#app')
