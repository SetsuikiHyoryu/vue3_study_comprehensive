<script lang="ts">
export default { name: 'Return' }
</script>

<script setup lang="ts">
import type { Router } from 'vue-router'

import { useRouter } from 'vue-router'

interface Props {
  target?: string
}

const props = withDefaults(defineProps<Props>(), {
  target: 'Catalog',
})

const router: Router = useRouter()

function handleReturn(): void {
  router.push({ name: props.target })
}
</script>

<template>
  <a class="return-button" @click="handleReturn">く 返回 </a>
</template>

<style scoped>
.return-button {
  color: #333;
  cursor: pointer;
  user-select: none;
}
</style>
