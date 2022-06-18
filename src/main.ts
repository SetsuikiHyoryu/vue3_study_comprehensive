import { createApp } from 'vue'
import { bootRouter } from './router'
import App from './App.vue'

const app = createApp(App)

bootRouter(app)

app.mount('#app')
