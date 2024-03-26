import { createApp } from 'vue'
import './style.css'
import './bootstrap/css/bootstrap.css'
import './bootstrap/js/bootstrap.js'
import App from './App.vue'

import router from './router.js'

createApp(App).use(router).mount('#app')
