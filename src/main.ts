import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { lightTheme } from '@/assets/styles/theme'

import App from './App.vue'
import router from './router'
const app = createApp(App)
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'lightTheme',
        themes: {
            lightTheme
        }
    }
})

app.use(router)
app.use(vuetify)
app.mount('#app')

export { vuetify }
