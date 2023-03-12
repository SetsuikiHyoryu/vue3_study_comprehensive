import { computed, ref } from 'vue'

export function useUserInfo() {
  const familyName = ref<string>('')
  const givenName = ref<string>('')
  const fullname = computed<string>(() => `${familyName.value}　${givenName.value}`)

  return { familyName, givenName, fullname }
}
