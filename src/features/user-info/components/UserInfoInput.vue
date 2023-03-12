<script setup lang="ts">
import BaseInput from './BaseInput.vue'

defineProps<{ title: string; modelValue: string }>()
const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>()

function handleInput(event: Event): void {
  const node = event.target as HTMLInputElement
  emit('update:modelValue', node.value)
}
</script>

<template>
  <div id="user-info-wrapper">
    <span>{{ title }}: </span>
    <BaseInput class="item" :model-value="modelValue" @input="handleInput" />
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
