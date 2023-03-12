<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ (event: 'update:modelValue', value: string): void }>()
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="(event) => $emit('update:modelValue', (event.target as HTMLInputElement).value)"
  />
</template>
