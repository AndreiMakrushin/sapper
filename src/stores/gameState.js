import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameState = defineStore('gamestate', () => {
  const totalNoneMine = ref(null)
  const gameOwer = ref(false)
  const playerId = ref(0)
  const clearBoard = ref(false)
  const start = ref(true)
  const points = ref(0)
  const settingsView = ref(false)
  const timer = ref(0)
  const selectedTime = ref(10)
  const timerCounter = ref(0)
  const existingData = JSON.parse(localStorage.getItem('player')) || []
  let interval

  const startTimer = () => {
    start.value = false
    if (selectedTime.value <= 0) {
      alert('Выберите время')
      return
    } else {
      timer.value = selectedTime.value * 60
      interval = setInterval(() => {
        timerCounter.value++
        timer.value--
        if (timer.value <= 0) {
          gameOwer.value = true
          clearInterval(interval)
        }
      }, 1000)
    }
  }

  const stopTimer = () => {
    clearInterval(interval)
  }

  const timeDisplay = computed(() => {
    const formatMinutes = (time) => String(Math.floor(time / 60)).padStart(2, '0')
    const formatSeconds = (time) => String(time % 60).padStart(2, '0')

    return {
      formatTime: `${formatMinutes(timer.value)}:${formatSeconds(timer.value)}`,
      CounterTimer: `${formatMinutes(timerCounter.value)}:${formatSeconds(timerCounter.value)}`
    }
  })

  const restartGame = () => {
    timer.value = 0
    gameOwer.value = false
    start.value = true
    points.value = 0
    selectedTime.value = 10
    clearBoard.value = true
    timerCounter.value = 0
  }

  const addLiderToBabble = () => {
    playerId.value = existingData.length + 1
    const newData = {
      playerId: playerId.value,
      points: points.value,
      time: timeDisplay.value.CounterTimer
    }
    existingData.push(newData)
    localStorage.setItem('player', JSON.stringify(existingData))
  }

  return {
    selectedTime,
    settingsView,
    startTimer,
    stopTimer,
    gameOwer,
    points,
    start,
    restartGame,
    clearBoard,
    playerId,
    totalNoneMine,
    timeDisplay,
    addLiderToBabble,
    existingData
  }
})
