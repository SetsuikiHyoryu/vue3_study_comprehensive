<script lang="ts" setup>
import Return from '@/components/button/Return.vue'

import { ref } from 'vue'

const articles: string[] = ['', '愚公移山', '为人民服务', '纪念白求恩']

const selectedArticle = ref<string>('')
const setSelectedArticle = (article: string) => (selectedArticle.value = article)

const menuDisplayed = ref<boolean>(false)
const setMenuDisplayed = (status: boolean) => (menuDisplayed.value = status)

const refMenu = ref<Node>()

function toggleMenu(): void {
  setMenuDisplayed(!menuDisplayed.value)
}

function blurMenu(event: FocusEvent): void {
  const isBlurWithMenu: boolean =
    refMenu.value?.contains(event.relatedTarget as Node | null) ?? false

  !isBlurWithMenu && setMenuDisplayed(false)
}

function selectArticle(article: string): void {
  setSelectedArticle(article)
  setMenuDisplayed(false)
}
</script>

<template>
  <div id="drop-down-with-blur-click">
    <Return />

    <div class="wrapper">
      <!-- button -->
      <input
        type="text"
        class="control-button"
        :value="selectedArticle"
        @click="toggleMenu"
        @blur="blurMenu"
      />

      <!-- menu -->
      <ul v-show="menuDisplayed" class="menu-box" ref="refMenu">
        <li class="menu-item" v-for="article of articles">
          <a href="javascript:void(0)" @click="() => selectArticle(article)">
            {{ article }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0;
  padding: 1rem 1.5rem;
}

.control-button {
  box-sizing: border-box;
  font-size: 16px;
  padding: 0.3rem 0.5rem;
  width: 10rem;
}

.menu-box {
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 0;
  list-style-type: none;
  margin: 0.5rem;
  padding: 0;
  width: 10rem;
}

.menu-item a {
  background: #fff;
  box-sizing: border-box;
  color: #333;
  display: inline-block;
  height: 100%;
  padding: 0.2rem 1rem;
  text-decoration: none;
  width: 100%;
}

.menu-item a:hover {
  background: #888;
  color: #fff;
}
</style>
