<script lang="ts" setup>
interface Props {
  title: string
}

const { title } = defineProps<Props>()

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
  font-size: 1.3rem;
  min-width: 13rem;
}
</style>
