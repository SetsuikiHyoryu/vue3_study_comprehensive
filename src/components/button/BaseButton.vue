<script lang="ts" setup>
interface Props {
  title: string
  width?: string
  height?: string
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
})

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
  height: v-bind('height');
  min-width: 13rem;
  width: v-bind('width');
}
</style>
