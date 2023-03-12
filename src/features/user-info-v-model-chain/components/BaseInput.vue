<script setup lang="ts">
import { useVModel } from '@/context'

const props = defineProps<{ modelValue: string }>()
const value = useVModel(props, 'modelValue')
</script>

<template>
  <input type="text" v-model="value" />
</template>
