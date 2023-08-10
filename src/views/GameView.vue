<script setup>
import { reactive } from 'vue'
import { useGameState } from '../stores/gameState'
import Game from '../components/Game.vue'
import Settings from '../components/Settings.vue'
import GameOwer from '../components/GameOwer.vue'

const gameState = reactive(useGameState())
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="block">
        <div v-if="gameState.settingsView" class="settings">
          <Settings />
        </div>
        <div v-else>
          <div class="timers" v-if="!gameState.start">
            <p>Времени прошло: {{ gameState.timeDisplay.CounterTimer }}</p>
            <p>Остаток времени: {{ gameState.timeDisplay.formatTime }}</p>
            <p>Ячеек без мин: {{ gameState.totalNoneMine }}</p>
          </div>

          <div class="gameANDgameower">
            <Game />
            <GameOwer v-if="gameState.gameOwer" />
          </div>
        </div>
      </div>

      <div class="buttons-game" v-show="gameState.start">
        <button
          class="btn button-strat-game"
          @click="gameState.startTimer(), (gameState.settingsView = false)"
        >
          Старт
        </button>
        <button class="btn button-search-difficulty" @click="gameState.settingsView = true">
          Выбор сложности
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>

.red-button {
  background-color: lightslategray;
}

.timers {
  font-size: 20px;
  color: aliceblue;
  display: flex;
}
.timers p {
  margin: 10px;
}
.wrapper {
  align-items: center;
  text-align: center;
  display: flex;
  max-width: 77%;
  max-height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0px auto;
  flex-direction: column;
}
.block {
  margin: 80px 20px 20px 20px;
  position: relative;
}
.buttons-game {
  display: flex;
  position: absolute;
  margin: 25px auto;
  gap: 20px;
}
.btn {
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 3px;
  border: 2px solid #f38181;
  color: #f38181;
  transition: 0.3s;
}
.btn:hover {
  ransition: 0.3s;
  background-color: #f38181;
  border: 2px solid white;
  color: aliceblue;
}
</style>
