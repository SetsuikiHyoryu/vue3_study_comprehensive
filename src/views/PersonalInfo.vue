<script setup lang="ts">
import UserInfoInput from '@/features/user-info/components/UserInfoInput.vue'
import { useUserInfo } from '@/features/user-info/compositions'
const { familyName, givenName, fullname } = useUserInfo()
</script>

<template>
  <div class="wrapper">
    <div class="input-wrapper">
      <UserInfoInput title="姓" v-model="familyName" />
      <UserInfoInput title="名" v-model="givenName" />
    </div>

    <span class="display">{{ fullname }}</span>
  </div>
</template>

<style scoped>
.wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100vh;
  justify-content: center;
}

.input-wrapper {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.display {
  align-items: center;
  background: pink;
  box-sizing: border-box;
  display: flex;
  height: 2rem;
  justify-content: center;
  min-width: 10rem;
  padding: 0 1rem;
}
</style>
