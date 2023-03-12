import type { WritableComputedRef } from 'vue'

import { computed, getCurrentInstance } from 'vue'

/**
 * @description 使 props 可以使用 v-model
 * @param props Vue 组件的 props
 * @param name props 的属性名
 */
export function useVModel<Props, Name extends keyof Props>(
  props: Props,
  name: Name
): WritableComputedRef<Props[Name]> {
  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error('This is not a Vue Component.')
  }

  // 从当前 Vue 组件实例中获取 emit。
  const emit = instance.emit

  // 返回一个可写入的计算属性
  return computed<Props[Name]>({
    get: () => props[name],
    set: (value: Props[Name]) => emit(`update:${name.toString()}`, value)
  })
}
