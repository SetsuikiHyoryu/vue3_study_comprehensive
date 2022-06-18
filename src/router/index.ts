import type { App } from 'vue'
import type { Router } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routs'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function bootRouter(app: App): void {
  app.use(router)
}
