<script lang="ts" setup>
defineProps<{
  title: string
}>()

interface Emits {
  (event: 'click'): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <button @click="emit('click')">{{ title }}</button>
</template>

<style scoped>
button {
  padding: 0.3rem 1rem;
  font-size: 18px;
  min-width: 30%;
  max-width: 50%;
}
</style>
