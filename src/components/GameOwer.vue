<script setup>
import { reactive } from 'vue'
import { useGameState } from '../stores/gameState'
const gameState = reactive(useGameState())
</script>
<template>
  <div class="info">
    {{ gameState.totalNoneMine === 0 ? 'Вы Победили' : 'Вы проиграли' }}
    Очков набрано: <strong>{{ gameState.points }}</strong>
    <button class="button-pause" @click="gameState.restartGame">Новая игра</button>
  </div>
</template>
<style scoped>
.info {
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  margin-top: 30px;
  gap: 10px;
}
strong {
  font-size: 20px;
  font-weight: 700;
}
.button-pause {
  padding: 8px 14px;
  border-radius: 3px;
  border: 2px solid #f38181;
  color: #f38181;
  transition: 0.3s;
}
.button-pause:hover {
  transition: 0.3s;
  background-color: #f38181;
  border: 2px solid white;
  color: aliceblue;
}
</style>
