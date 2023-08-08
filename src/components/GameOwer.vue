<script setup>
import { reactive } from 'vue'
import { useGameState } from '../stores/gameState'
const gameState = reactive(useGameState())


</script>
<template>
  <div>
    игра окончена Твои очки: {{ gameState.points }}
    <button class="button-pause" @click="gameState.restartGame">Новая игра</button>
  </div>
</template>
