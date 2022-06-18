<script lang="ts">
export default { name: 'ChangeableTableColumnWidth' }
</script>

<script setup lang="ts">
import Return from '@/components/button/Return.vue'

import { queryCharacters } from '@/api/characters'
import { onBeforeMount, reactive, ref } from 'vue'
import { computed } from '@vue/reactivity'

// State
const tableHeads: string[] = ['姓名', '生日', '身高', '出身地', '种族']

const characters = ref<CharacterModel[]>([])
const setCharacters = (list: CharacterModel[]) => (characters.value = [...list])

onBeforeMount(async (): Promise<void> => {
  const list: CharacterModel[] = await queryCharacters()
  setCharacters(list)
})

// Move Start
interface PointerX {
  start: number
  end: number
}

const pointerX = reactive<PointerX>({
  start: 0,
  end: 0,
})

function setPointerX({ start, end }: PointerX): void {
  pointerX.start = start
  pointerX.end = end
}

interface BoxInfo {
  index: number
  width: number
}

const boxInfo = reactive<BoxInfo>({
  index: -1,
  width: 0,
})

function setBoxInfo({ index, width }: BoxInfo): void {
  boxInfo.index = index
  boxInfo.width = width
}

const moveLocked = ref<boolean>(true)
const setMoveLockStatus = (status: boolean) => (moveLocked.value = status)

function moveStart(event: MouseEvent | TouchEvent, index: number): void {
  setMoveLockStatus(false)
  setPointerX({ start: getCurrentX(event), end: 0 })

  const node = event.target as HTMLElement
  const width: number = node.parentElement?.clientWidth as number
  setBoxInfo({ index, width })
}

// Moving
interface BoxWidth {
  name: number
  birthday: number
  height: number
  birthplace: number
}

const boxWidth = reactive<BoxWidth>({
  name: 0,
  birthday: 0,
  height: 0,
  birthplace: 0,
})

function setBoxWidth(newValue: number): void {
  const setters = [
    () => (boxWidth.name = newValue),
    () => (boxWidth.birthday = newValue),
    () => (boxWidth.height = newValue),
    () => (boxWidth.birthplace = newValue),
  ]

  setters[boxInfo.index]()
}

function movePointer(event: MouseEvent | TouchEvent): void {
  if (moveLocked.value) {
    return
  }

  setPointerX({ ...pointerX, end: getCurrentX(event) })
  setBoxWidth(boxInfo.width + pointerX.end - pointerX.start)
}

function getCurrentX(event: MouseEvent | TouchEvent): number {
  const mouseEvent = event as MouseEvent
  const touchEvent = event as TouchEvent
  return mouseEvent?.x ?? touchEvent.touches[0].clientX
}

// Grid Style
const gridColumns = computed<string>(() => {
  return `${getWidth(boxWidth.name)} ${getWidth(boxWidth.birthday)} ${getWidth(
    boxWidth.height
  )} ${getWidth(boxWidth.birthplace)} 1fr`
})

function getWidth(width: number): string {
  if (width === 0) {
    return '1fr'
  }

  return width < 50 ? '50px' : width + 'px'
}
</script>

<template>
  <div class="changeable-table-column-width">
    <Return target="Catalog" />

    <div class="table-wrapper">
      <table aria-describedby="table">
        <thead
          @mousemove="movePointer"
          @mouseup="() => setMoveLockStatus(true)"
          @mouseleave="() => setMoveLockStatus(true)"
          @touchmove="movePointer"
          @touchend="() => setMoveLockStatus(true)"
        >
          <tr class="grid">
            <th v-for="(element, index) in tableHeads" :key="element">
              <span>{{ element }}</span>

              <a
                class="stick"
                v-if="index !== tableHeads.length - 1"
                @mousedown.stop="(event: MouseEvent) => moveStart(event, index)"
                @touchstart="(event: TouchEvent) => moveStart(event, index)"
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class="grid" v-for="item in characters" :key="item.name">
            <td v-for="(value, key) of item" :key="value">
              {{ key === 'height' ? value + 'cm' : value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  margin: 1rem 0 0;
  overflow-x: auto;
}

.table-wrapper table {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: v-bind('gridColumns');
  height: 2.5rem;
}

.table-wrapper thead {
  border-bottom: solid 1px #333;
  text-align: left;
}

.table-wrapper th {
  border-right: solid 2px #333;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-wrapper th:last-child {
  border-right: none;
}

.stick {
  cursor: col-resize;
  display: block;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 1.5rem;
}

.table-wrapper td {
  overflow: hidden;
  padding: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
