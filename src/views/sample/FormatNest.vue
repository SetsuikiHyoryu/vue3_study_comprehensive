<script lang="ts">
export default { name: 'FormatNest' }
</script>

<script setup lang="ts">
import Return from '@/components/button/Return.vue'
import BaseButton from '@/components/button/BaseButton.vue'

import type { AxiosRequestConfig } from 'axios'

import { dotnetHTTP } from '@/utils/http/axios'

async function handleClick(): Promise<void> {
  const { data } = await dotnetHTTP(<AxiosRequestConfig<any>>{
    url: '/weatherforecast',
    methods: 'GET',
  })

  console.log(data)
}
</script>

<template>
  <div class="format-nest">
    <Return />

    <BaseButton class="button" title="测试" width="10rem" @click="handleClick" />
  </div>
</template>

<style scoped>
.format-nest {
  display: flex;
  flex-direction: column;
}

.button {
  margin: 2rem 0 0;
}
</style>
