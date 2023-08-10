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
    <div class="block">
      <div v-if="gameState.settingsView">
        <Settings />
      </div>
      <div v-else>
        Времени прошло: {{ gameState.timeDisplay.CounterTimer }} Остаток времени:
        {{ gameState.timeDisplay.formatTime }}

        <div class="gameANDgameower">
          <Game />
          <GameOwer v-if="gameState.gameOwer" />
        </div>
      </div>
    </div>

    <div class="buttons-game">
      <button
        class="button-strat-game"
        @click="gameState.startTimer()"
        :disabled="!gameState.start"
      >
        Старт
      </button>
      <button
        class="button-search-difficulty"
        @click="gameState.settingsView = true"
        :disabled="!gameState.start"
      >
        Выбор сложности
      </button>
    </div>
  </main>
</template>
