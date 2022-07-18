import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Catalog', component: () => import('@/views/Catalog.vue') },

  {
    path: '/connect-with-graphql',
    name: 'ConnectWithGraphQL',
    component: () => import('@/views/ConnectWithGraphQL.vue'),
  },

  {
    path: '/changeable-table-column-width',
    name: 'ChangeableTableColumnWidth',
    component: () => import('@/views/ChangeableTableColumnWidth.vue'),
  },

  {
    path: '/format-nest',
    name: 'FormatNest',
    component: () => import('@/views/sample/FormatNest.vue'),
  },
]

export default routes
