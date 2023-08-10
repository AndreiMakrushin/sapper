<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useGameState } from '../stores/gameState'
import Dropdown from 'primevue/dropdown'

const gameState = reactive(useGameState())

const selectedComplexity = ref()
const level = ref([
  { complexity: 'Простой 8x8, 10 мин', time: 10 },
  { complexity: 'Средний 16x16, 40 мин', time: 40 },
  { complexity: 'Сложный 32x16, 100 мин', time: 100 }
])
onMounted(() => {
  if (!selectedComplexity.value) {
    selectedComplexity.value = level.value[0]
  }
})

watch(selectedComplexity, () => {
  gameState.selectedTime = selectedComplexity.value.time
})
</script>

<template>
  <div class="settings">
    <div class="close">
      <h1 @click="gameState.settingsView = false">x</h1>
    </div>
    <div class="card flex justify-content-center">
      <Dropdown
        v-model="selectedComplexity"
        :options="level"
        optionLabel="complexity"
        placeholder="выбор сложности"
        class="w-full md:w-14rem"
      />
    </div>
  </div>
</template>
<style scoped>
.settings {
  height: 100%;
}
.close {
  color: white;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.close h1 {
  font-size: 1.5rem;
  cursor: pointer;
}

.card {
  background-color: #f4f4f4;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.w-full {
  width: 100%;
}

.md\:w-14rem {
  width: 14rem;
}

.dropdown {
  position: relative;
}

.dropdown .p-dropdown {
  width: 100%;
}
</style>
