import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
const app =createApp(App);
app.use(router);
app.use(MotionPlugin);
app.use(createPinia().use(piniaPersist));
app.mount('#app')

