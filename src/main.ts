import { createApp } from 'vue'
import App from './App.vue'
import './style/reset.scss'
import './style/tailwind.css'
import naive from 'naive-ui'
import router from '@/router/index'
// @ts-ignore
createApp(App).use(naive).use(router).mount('#app')
