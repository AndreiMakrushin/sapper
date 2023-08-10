<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useGameState } from '../stores/gameState'
const state = reactive(useGameState())
onMounted(() => {
  state.restartGame()
})
const sortLiders = ref([])

if (state.existingData) {
  sortLiders.value = state.existingData.sort((a, b) => {
    const timeA = new Date(`2000-01-01T${a.time}`)
    const timeB = new Date(`2000-01-01T${b.time}`)
    return timeA - timeB
  })
}
</script>

<template>
  <div  class="wrapper">
      <h1 class="title">лидеры</h1>
      <div class="table">
          <table >
              <thead>
                <tr>
                  <th >Номер игрока</th>
                  <th >Количество очков</th>
                  <th >Время</th>
                </tr>
              </thead>
              <tbody v-if="sortLiders.length > 0">
                <tr v-for="lider in sortLiders.slice(0, 10)" :key="lider.id">
                  <td>{{ lider.playerId }}</td>
                  <td>{{ lider.points }}</td>
                  <td>{{ lider.time }}</td>
                </tr>
              </tbody>
              <div v-else>Эта таблица пустая</div>
            </table>
      </div>
  </div>
</template>
<style scoped>
th{
  padding: 15px;
}
td {
  padding: 1px;
  border-bottom: 1px solid white;
}

tr {
  text-align: center;
}

.wrapper {
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.title {
  text-align: center;
}

.table {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
