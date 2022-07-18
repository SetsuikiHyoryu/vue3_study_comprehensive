<script lang="ts">
export default { name: 'Catalog' }
</script>

<script setup lang="ts">
import BaseButton from '@/components/button/BaseButton.vue'

import { useRouter } from 'vue-router'

interface Service {
  title: string
  routeName: string
}

const serviceList: Service[] = [
  {
    title: 'GraphQL 前后端连接',
    routeName: 'ConnectWithGraphQL',
  },

  {
    title: '实时可变表格列宽',
    routeName: 'ChangeableTableColumnWidth',
  },

  {
    title: '格式化嵌套数据',
    routeName: 'FormatNest',
  },
]

const router = useRouter()

function handleTransfer(routeName: string): void {
  router.push({ name: routeName })
}
</script>

<template>
  <div class="catalog">
    <BaseButton
      v-for="item in serviceList"
      class="button"
      :key="item.title"
      :title="item.title"
      @click="() => handleTransfer(item.routeName)"
    />
  </div>
</template>

<style scoped>
.catalog {
  display: flex;
  flex-direction: column;
  width: 30%;
}

.button {
  margin: 0 0 0.7rem;
}
</style>
