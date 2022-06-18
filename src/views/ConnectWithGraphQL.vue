<script lang="ts">
export default { name: 'ConnectWithGraphQL' }
</script>

<script setup lang="ts">
import BaseButton from '../components/button/BaseButton.vue'

import type { QueryWorksModel, WorkModel } from '../api/model'
import type { InputHTMLAttributes } from 'vue'

import { reactive, ref } from 'vue'
import { queryWorks, addWork } from '../api/works'

// 输入
type FormState = WorkModel

const formState = reactive<FormState>({
  title: '',
  author: '',
})

const handleSetFormTitle = ($envet: Event): void => {
  message.value = ''
  formState.title = ($envet.target as InputHTMLAttributes).value
}

const handleSetFormAuthor = ($evnet: Event): void => {
  message.value = ''
  formState.author = ($evnet.target as InputHTMLAttributes).value
}

// 添加
const message = ref<string>('')

const handleAddWork = async (): Promise<void> => {
  const emptyExisted = Object.keys(formState).some((key: string): boolean => {
    const _key = key as keyof FormState
    return !formState[_key]
  })

  if (emptyExisted) {
    message.value = '增加时内容不可以为空'
    return
  }

  const successed: boolean = await addWork({
    title: formState.title,
    author: formState.author,
  })

  message.value = successed ? '添加成功' : '添加失败'
}

// 检索
const works = ref<QueryWorksModel>()

const handleSetWorks = async (): Promise<void> => {
  message.value = ''
  works.value = await queryWorks({ title: formState.title, author: formState.author })
}
</script>

<template>
  <div class="connect-with-graphql">
    <div class="input-group">
      <input type="text" placeholder="请输入作品名" @input="handleSetFormTitle" />
      <input type="text" placeholder="请输入作者名" @input="handleSetFormAuthor" />
    </div>

    <div class="message">{{ message }}</div>

    <div class="button-group">
      <BaseButton title="请求作品" @click="handleSetWorks" />
      <BaseButton title="增加作品" @click="handleAddWork" />
    </div>

    <BaseButton
      class="delete-button"
      title="清除当前列表"
      @click="
        () => {
          works = []
          message = ''
        }
      "
    />

    <div v-for="(item, index) in works" :key="index" class="works-card">
      <span>作品名：《{{ item.title }}》</span>
      <span>作者：{{ item.author }}</span>
    </div>
  </div>
</template>

<style scoped>
.connect-with-graphql {
  color: #000;
  font-size: 2rem;
}

.input-group {
  display: flex;
  gap: 1rem;
}

input {
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  width: 11rem;
}

.message {
  font-size: 1.2rem;
  margin: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin: 1rem 0 0;
}

.delete-button {
  margin: 1rem 0 0;
}

.works-card {
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  margin: 1rem 0 0 0;
  padding: 0.5rem 1rem;
  width: 20rem;
}

@media (max-width: 500px) {
  .input-group {
    flex-direction: column;
  }

  .button-group {
    flex-direction: column;
  }

  .works-card {
    width: 100%;
  }
}

@media (min-width: 501px) {
  .delete-button {
    width: 100%;
  }
}
</style>
