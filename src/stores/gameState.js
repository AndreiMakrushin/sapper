import { ref, computed} from 'vue'
import { defineStore } from 'pinia'

export const useGameState = defineStore('gamestate', () => {
  const gameOwer = ref(false)
  const clearBoard = ref(false)
  const start = ref(true)
  const points = ref(0)
  const settingsView = ref(false)
  const timer = ref(0)
  const selectedTime = ref(10)
  let interval

  const startTimer = () => {
    start.value = false
    if (selectedTime.value <= 0) {
      alert('Выберите время')
      return
    } else {
      timer.value = selectedTime.value * 60
      interval = setInterval(() => {
        timer.value--
        if (timer.value <= 0) {
          clearInterval(interval)
        }
      }, 1000)
    }
  }

  const stopTimer = () => {
    clearInterval(interval)
  }

  const formatTime = computed(() => {
    const minutes = Math.floor(timer.value / 60)
    const seconds = timer.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })
  
  const restartGame = () => {
    gameOwer.value = false
    start.value = true
    points.value = 0
    timer.value = 0
    selectedTime.value = 10
    clearBoard.value = true
  }

  return { selectedTime, settingsView, startTimer, stopTimer, formatTime, gameOwer, points, start, restartGame, clearBoard }
})
