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
  <div>
    <div v-if="sortLiders.length > 0">
      <div class="liders" v-for="lider in sortLiders.slice(0, 10)" :key="lider.id">
        {{ lider }}
      </div>
    </div>
    <div v-else>Эта таблица пустая</div>
  </div>
</template>
