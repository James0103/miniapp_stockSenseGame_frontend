import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL

export const useGameStore = defineStore('game', {
  state: () => ({
    stockData: [], // Full 30 days of data
    gameData: [], // The 10 days used for the game
    contextData: [], // The initial 20 days for context
    currentStage: 0, // 0 to 9
    score: 0,
    history: [], // User's guesses: { stage: 0, guess: 'O', result: 'O', correct: true }
    isLoading: false,
    error: null,
    gameStatus: 'idle', // 'idle', 'playing', 'finished'
    symbol: '',
    startDate: null,
    endDate: null,
  }),

  getters: {
    currentDay() {
      if (this.gameData.length === 0) return null
      return this.gameData[this.currentStage]
    },
    previousDay() {
      if (this.currentStage === 0) {
        return this.contextData[this.contextData.length - 1]
      }
      return this.gameData[this.currentStage - 1]
    },
    visibleData() {
      // Returns data up to the current stage (context + played stages)
      // If the user has NOT guessed yet, we show up to previous day.
      // If the user HAS guessed (and we are waiting for next), we show up to current day.
      // Actually, let's simplify:
      // We always show context + completed stages.
      // When guessing for stage N, we see context + (0 to N-1).
      // After guess, we reveal N.

      // Wait, the requirement is "Show context, user guesses if TODAY (hidden) is higher/lower than YESTERDAY".
      // So for Stage 0: Show Context. Guess if GameDay[0] > Context[last].
      // Reveal GameDay[0].
      // Stage 1: Show Context + GameDay[0]. Guess if GameDay[1] > GameDay[0].

      const revealedGameData = this.gameData.slice(0, this.currentStage)
      return [...this.contextData, ...revealedGameData]
    },
    isCorrect() {
      // Helper to check if the last guess was correct (for UI feedback)
      if (this.history.length === 0) return null
      return this.history[this.history.length - 1].correct
    },
  },

  actions: {
    async startGame() {
      this.isLoading = true
      this.error = null
      this.gameStatus = 'loading'

      try {
        const response = await axios.get(`${API_BASE}/api/simulation`)
        const { symbol, data, startDate, endDate } = response.data

        this.symbol = symbol
        this.startDate = startDate
        this.endDate = endDate

        // Ensure we have enough data
        if (!data || data.length < 30) {
          throw new Error('Insufficient data received')
        }

        // Split data: First 20 days for context, next 10 days for game
        // Note: Yahoo Finance returns oldest first.
        this.stockData = data
        this.contextData = data.slice(0, 20)
        this.gameData = data.slice(20, 30)

        this.currentStage = 0
        this.score = 0
        this.history = []
        this.gameStatus = 'playing'
      } catch (err) {
        console.error('Start game error:', err)
        this.error = '게임을 시작할 수 없습니다. 다시 시도해주세요.'
        this.gameStatus = 'idle'
      } finally {
        this.isLoading = false
      }
    },

    submitGuess(guess) {
      // guess: 'O' (Up) or 'X' (Down)
      if (this.gameStatus !== 'playing') return

      const today = this.gameData[this.currentStage]
      const yesterday = this.previousDay

      const isUp = today.close > yesterday.close
      const correctAnswer = isUp ? 'O' : 'X'
      const isCorrect = guess === correctAnswer

      if (isCorrect) {
        this.score += 10 // 10 points per stage -> 100 max
      }

      this.history.push({
        stage: this.currentStage,
        guess,
        result: correctAnswer,
        correct: isCorrect,
        dayData: today,
      })

      // Move to next stage or finish
      if (this.currentStage < 9) {
        this.currentStage++
      } else {
        this.gameStatus = 'finished'
      }
    },

    resetGame() {
      this.gameStatus = 'idle'
      this.stockData = []
      this.gameData = []
      this.contextData = []
      this.currentStage = 0
      this.score = 0
      this.history = []
    },
  },
})
