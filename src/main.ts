import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vant)
app.mount('#app')
