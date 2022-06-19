import { createApp } from 'vue'
import { bootRouter } from './router'
import App from './App.vue'
import 'default-passive-events'

const app = createApp(App)

bootRouter(app)

app.mount('#app')
