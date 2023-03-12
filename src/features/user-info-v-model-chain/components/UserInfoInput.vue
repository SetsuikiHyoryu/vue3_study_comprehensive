<script setup lang="ts">
import BaseInput from './BaseInput.vue'

import { useVModel } from '@/context'

const props = defineProps<{ title: string; modelValue: string }>()
const value = useVModel(props, 'modelValue')
</script>

<template>
  <div id="user-info-wrapper">
    <span>{{ title }}: </span>
    <BaseInput class="item" v-model="value" />
  </div>
</template>

<style scoped>
#user-info-wrapper {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}

.item {
  margin: 0.1rem 0 0;
}
</style>
