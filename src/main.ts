import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app =createApp(App);
app.use(MotionPlugin);
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(router);
app.mount('#app')

