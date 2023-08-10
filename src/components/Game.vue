<script setup>
import { reactive, computed, ref, onMounted, watch } from 'vue'
import { useGameState } from '../stores/gameState'
const state = reactive(useGameState())

const board = ref([])
const createBoard = (size) => {
  const width = size
  const height = size > 16 ? Math.ceil(size / 2) : size

  const board = []

  try {
    for (let i = 0; i < height; i++) {
      const row = []
      for (let j = 0; j < width; j++) {
        row.push({ isOpen: false, hasMine: false, value: '*', flag: false })
      }

      board.push(row)
    }
  } catch (error) {
    console.log(error)
  }

  const numMines = Math.floor(size * size * 0.02)
  state.flags = Math.ceil(numMines % 2)
  const cells = Array.from({ length: size * size }, (_, index) => ({
    row: Math.floor(index / size),
    col: index % size
  }))
  state.totalNoneMine = cells.length - numMines

  for (let i = 0; i < numMines; i++) {
    const randomIndex = Math.floor(Math.random() * cells.length)
    const { row, col } = cells.splice(randomIndex, 1)[0]

    // Добавляем проверку границ перед обращением к элементам массива board
    if (row >= 0 && row < height && col >= 0 && col < width) {
      board[row][col][i < numMines ? 'hasMine' : 'flag'] = true
    }
  }

  return board
}

const getNeighborMinesCount = (row, col) => {
  const directions = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 }
  ]
  return directions.reduce((count, { x, y }) => {
    const newRow = row + x
    const newCol = col + y

    if (
      newRow >= 0 &&
      newRow < boardSize.value &&
      newCol >= 0 &&
      newCol < boardSize.value &&
      board.value[newRow][newCol].hasMine
    ) {
      count++
    }

    return count
  }, 0)
}

//установка цвета согласно признакам ячейки
const cellColor = (cell) => {
  switch (cell.value) {
    case 1:
      return 'cell-value-1'
    case 2:
      return 'cell-value-2'
    case 3:
      return 'cell-value-3'
    case 4:
      return 'cell-value-4'
    case 5:
      return 'cell-value-5'
    case 6:
      return 'cell-value-6'
    case 7:
      return 'cell-value-7'
    case 8:
      return 'cell-value-8'
    default:
      return ''
  }
}

function isValidCell(row, col) {
  return row >= 0 && row < boardSize.value && col >= 0 && col < boardSize.value
}
const openAdjacentCells = (row, col) => {
  const queue = [{ row, col }]

  try {
    while (queue.length > 0) {
      const { row, col } = queue.shift()
      const cell = board.value[row][col]

      if (!cell.isOpen) {
        cell.isOpen = true
        cell.isClicked = true
      }
      state.totalNoneMine--
      if (cell.value === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i
            const newCol = col + j

            if (isValidCell(newRow, newCol)) {
              const newCell = board.value[newRow][newCol]
              if (!newCell.isOpen && !newCell.flag) {
                queue.push({ row: newRow, col: newCol })
              }
            }
          }
        }
      }
    }

    if (state.totalNoneMine === 0 && !state.gameOwer) {
      state.addLiderToBabble()
      state.gameOwer = true
      state.stopTimer()
    }
  } catch (error) {
    console.log(error)
  }
}

const openCell = (row, col, cell) => {
  try {
    if (cell.isClicked || state.gameOwer || state.start) {
      return
    }
    if (board.value[row][col].hasMine) {
      state.gameOwer = true
      state.stopTimer()
    } else {
      state.points++
      board.value[row][col].value = getNeighborMinesCount(row, col)
    }
    cell.isOpen = true
    cell.isClicked = true

    openAdjacentCells(row, col)
  } catch (error) {
    console.log(error)
  }
}

const boardSize = computed(() => {
  if (state.selectedTime === 10) {
    return 8
  } else if (state.selectedTime === 40) {
    return 16
  } else {
    return 32
  }
})
watch(
  () => state.clearBoard,
  (value) => {
    if (value) {
      board.value = createBoard(boardSize.value)
      state.clearBoard = false
    }
  }
)
onMounted(() => {
  board.value = createBoard(boardSize.value)

  watch(
    () => state.gameOwer,
    (value) => {
      if (value && state.totalNoneMine !== 0) {
        document.getElementById('soundBoom').play()
      }
    }
  )
})
const toggleFlag = (cell) => {
  if (state.flags === 0) {
    return
  } else {
    if (!cell.isClicked) {
      cell.flag = true
      state.flags--
      if (cell.hasMine) {
        const { row, col } = cell
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i
            const newCol = col + j

            if (isValidCell(newRow, newCol)) {
              const newCell = board.value[newRow][newCol]
              if (!newCell.isOpen && !newCell.flag) {
                newCell.value = 1
              }
            }
          }
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="game-block">
      <table class="board">
        <tbody>
          <tr v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
            <td
              v-for="(cell, colIndex) in row"
              :key="colIndex"
              class="cell"
              @click="openCell(rowIndex, colIndex, cell)"
              @contextmenu.prevent="toggleFlag(cell)"
              :disabled="cell.isClicked"
            >
              <div class="cell-content" v-if="cell.isOpen">
                <div
                  class="cell-value"
                  :class="[
                    cellColor(cell),
                    { bomb: cell.hasMine || cell.flag, 'bomb-animation': cell.hasMine }
                  ]"
                >
                  {{ cell.flag ? '🚩' : cell.hasMine ? '💣' : cell.value }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="sound">
        <audio id="soundBoom" controls>
          <source src="../sounds//gejm.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  margin-top: 30px;
}
.cell-value-1 {
  color: blue;
}

.cell-value-2 {
  color: green;
}

.cell-value-3 {
  color: red;
}

.cell-value-4 {
  color: darkblue;
}

.cell-value-5 {
  color: brown;
}

.cell-value-6 {
  color: turquoise;
}

.cell-value-7 {
  color: black;
}

.cell-value-8 {
  color: white;
}
@keyframes bombAnimation {
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  50% {
    transform: scale(10);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.bomb-animation {
  animation: bombAnimation 1s ease-in-out;
}
.sound {
  display: none;
}
.board {
  margin: 0 auto;
  border-collapse: collapse;
}
.row {
  display: table-row;
}

.cell {
  background-color: #fce38a;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.cell-content {
  background-color: #fbf5df;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.cell-value {
  font-size: 14px;
}

.cell-flag {
  font-size: 14px;
  color: red;
}

.cell-closed {
  font-size: 14px;
  color: gray;
}
</style>
