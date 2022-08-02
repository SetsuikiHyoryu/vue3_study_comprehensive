<script lang="ts">
export default { name: 'ChangeableTableColumnWidth' }
</script>

<script setup lang="ts">
import { queryCharacters } from '@/api/characters'
import Return from '@/components/button/Return.vue'
import { onBeforeMount, reactive, ref, computed } from 'vue'

// Data
const tableHeads: string[] = ['代号', '生日', '身高', '出身地', '种族']

const characters = ref<CharacterModel[]>([])
const setCharacters = (list: CharacterModel[]) => (characters.value = [...list])

onBeforeMount(async () => {
  setCharacters(await queryCharacters())
})

// Move Start
interface PointerX {
  start: number
  end: number
}

const pointerX = reactive<PointerX>({ start: 0, end: 0 })

function setPointerX({ start, end }: PointerX): void {
  pointerX.start = start
  pointerX.end = end
}

interface ColumnInfo {
  index: number
  width: number
}

const columnInfo = reactive<ColumnInfo>({
  index: -1,
  width: 0,
})

function setColumnInfo({ index, width }: ColumnInfo): void {
  columnInfo.index = index
  columnInfo.width = width
}

const moveLocked = ref<boolean>(true)
const setMoveLockStatus = (status: boolean) => (moveLocked.value = status)

function handleMoveStart(event: MouseEvent | TouchEvent, index: number): void {
  setMoveLockStatus(false)

  const node = event.target as HTMLElement
  setColumnInfo({ index, width: node.parentElement?.clientWidth ?? 0 })

  setPointerX({ start: getPointerX(event), end: 0 })
}

// Moving
interface HeadWidth {
  name: number
  birthday: number
  height: number
  birthplace: number
}

const headWidth = reactive<HeadWidth>({
  name: 0,
  birthday: 0,
  height: 0,
  birthplace: 0,
})

function setHeadWidth(index: number, width: number): void {
  const setter: Function[] = [
    () => (headWidth.name = width),
    () => (headWidth.birthday = width),
    () => (headWidth.height = width),
    () => (headWidth.birthplace = width),
  ]

  setter[index]()
}

function handleMove(event: MouseEvent | TouchEvent): void {
  if (moveLocked.value) {
    return
  }

  setPointerX({ ...pointerX, end: getPointerX(event) })

  const newWidth = columnInfo.width + pointerX.end - pointerX.start
  setHeadWidth(columnInfo.index, newWidth)
}

function getPointerX(event: MouseEvent | TouchEvent): number {
  const mouseEvent = event as MouseEvent
  const touchEvent = event as TouchEvent
  return mouseEvent?.x ?? touchEvent.touches[0].clientX
}

// Style
const gridColumns = computed<string>(
  () =>
    `${setGridColumn(headWidth.name)} ${setGridColumn(
      headWidth.birthday
    )} ${setGridColumn(headWidth.height)} ${setGridColumn(headWidth.birthplace)} 1fr`
)

function setGridColumn(width: number): string {
  if (!width) {
    return '1fr'
  }

  return width < 50 ? '50px' : width + 'px'
}
</script>

<template>
  <div class="changeable-table-column-width">
    <Return />

    <div class="table-wrapper">
      <table aria-describedby="table">
        <thead
          @mousemove="handleMove"
          @mouseup="() => setMoveLockStatus(true)"
          @mouseleave="() => setMoveLockStatus(true)"
          @touchmove="handleMove"
          @touchend="() => setMoveLockStatus(true)"
        >
          <tr class="grid">
            <th v-for="(element, index) in tableHeads" :key="element">
              <span>{{ element }}</span>

              <a
                class="stick"
                v-if="index !== tableHeads.length - 1"
                @mousedown="(event: MouseEvent) => handleMoveStart(event, index)"
                @touchstart="(event: TouchEvent) => handleMoveStart(event, index)"
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class="grid" v-for="item in characters" :key="item.name">
            <td v-for="(value, key) of item">
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
  margin: 2rem 0 0;
}

.table-wrapper table {
  width: 100%;
}

.table-wrapper .grid {
  display: grid;
  grid-template-columns: v-bind('gridColumns');
}

.table-wrapper th {
  border-right: solid 2px #333;
  box-sizing: border-box;
  text-align: left;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
}

.table-wrapper th:last-child {
  border-right: 0;
}

.table-wrapper th .stick {
  cursor: col-resize;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 2rem;
}

.table-wrapper td {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
