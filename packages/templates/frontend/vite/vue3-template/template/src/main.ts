import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import './assets/styles/index.css'

const app = createApp(App)

// 先注册 pinia，路由守卫里要用到 store
app.use(pinia)
app.use(router)

app.mount('#app')