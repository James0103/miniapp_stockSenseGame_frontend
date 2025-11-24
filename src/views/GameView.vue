<template>
  <div class="game-container">
    <!-- Header -->
    <header class="game-header">
      <div class="stats-pill">
        <div class="stat-item">
          <span class="stat-label">Stage</span>
          <div class="stat-value-wrapper">
            <span class="stat-value-main">{{ gameStore.currentStage + 1 }}</span>
            <span class="stat-value-sub">/ 10</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
          <span class="stat-label">Score</span>
          <span class="stat-value-score">{{ gameStore.score }}</span>
        </div>
      </div>

      <div class="symbol-pill">
        <div class="symbol-text">{{ gameStore.symbol }}</div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="game-main">
      <!-- Chart Area -->
      <div class="chart-card">
        <StockChart :data="gameStore.visibleData" />

        <!-- Loading Overlay -->
        <div v-if="gameStore.isLoading" class="loading-overlay">
          <div class="loading-content">
            <div class="spinner"></div>
            <span class="loading-text">데이터 분석 중...</span>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div v-if="gameStore.gameStatus === 'playing'" class="controls-grid">
        <button @click="handleGuess('O')" class="btn-guess btn-rise">
          <div class="btn-hover-effect"></div>
          <div class="icon-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </div>
          <span class="btn-text">상승 (매수)</span>
        </button>

        <button @click="handleGuess('X')" class="btn-guess btn-fall">
          <div class="btn-hover-effect"></div>
          <div class="icon-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <span class="btn-text">하락 (매도)</span>
        </button>
      </div>

      <!-- Result Modal -->
      <div v-if="gameStore.gameStatus === 'finished'" class="modal-overlay">
        <div class="modal-content">
          <h2 class="modal-title">게임 종료</h2>

          <div class="score-display">
            <div class="score-label">최종 점수</div>
            <div class="score-value">
              {{ gameStore.score }}
            </div>
          </div>

          <div class="rank-card">
            <div class="rank-title">{{ getRank(gameStore.score) }}</div>
            <p class="rank-desc">{{ getRankDescription(gameStore.score) }}</p>
          </div>

          <button @click="restartGame" class="btn-restart">다시 도전하기</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import StockChart from '@/components/StockChart.vue'

const router = useRouter()
const gameStore = useGameStore()

onMounted(() => {
  if (gameStore.gameStatus === 'idle') {
    router.push('/')
  }
})

const handleGuess = (guess) => {
  gameStore.submitGuess(guess)
}

const restartGame = async () => {
  await gameStore.startGame()
}

const getRank = (score) => {
  if (score === 100) return '투자의 신'
  if (score >= 80) return '월가 늑대'
  if (score >= 60) return '현명한 투자자'
  if (score >= 40) return '평범한 개미'
  return '마이너스의 손'
}

const getRankDescription = (score) => {
  if (score === 100) return '워렌 버핏이 당신을 찾고 있습니다.'
  if (score >= 80) return '시장의 흐름을 완벽하게 읽고 계시네요.'
  if (score >= 60) return '수익을 낼 줄 아시는군요.'
  if (score >= 40) return '조금 더 연습이 필요해요.'
  return '당분간은 예금을 추천드립니다...'
}
</script>

<style scoped>
.game-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Header */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 64rem; /* max-w-5xl */
  margin-left: auto;
  margin-right: auto;
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  z-index: 10;
}

.stats-pill {
  /* Glass Panel */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-label {
  font-size: 0.625rem; /* text-[10px] */
  font-weight: 700;
  text-transform: uppercase;
  color: #6b7280; /* text-gray-500 */
  letter-spacing: 0.05em;
}

.stat-value-wrapper {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.stat-value-main {
  font-size: 1.25rem; /* text-xl */
  font-weight: 900;
  color: #1d1d1f;
}

.stat-value-sub {
  font-size: 0.875rem; /* text-sm */
  color: #9ca3af; /* text-gray-400 */
  font-weight: 500;
}

.stat-value-score {
  font-size: 1.25rem;
  font-weight: 900;
  color: #2563eb; /* text-blue-600 */
}

.divider {
  width: 1px;
  height: 2rem;
  background-color: #d1d5db; /* bg-gray-300 */
}

.symbol-pill {
  /* Glass Panel */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  padding: 0.5rem 1rem;
  border-radius: 1rem;
}

.symbol-text {
  font-size: 1.125rem; /* text-lg */
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #1d1d1f;
}

/* Main Content */
.game-main {
  flex: 1;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 10;
}

/* Chart Card */
.chart-card {
  position: relative;
  /* Glass Panel */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  border-radius: 2.5rem;
  padding: 1.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Loading Overlay */
.loading-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.5rem;
  z-index: 20;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  border: 4px solid #3b82f6; /* border-blue-500 */
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #4b5563; /* text-gray-600 */
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
}

/* Controls */
.controls-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: auto;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 36rem; /* max-w-xl */
  margin-left: auto;
  margin-right: auto;
}

.btn-guess {
  position: relative;
  padding: 2rem 0;
  border-radius: 2rem;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-guess:hover {
  transform: translateY(-4px);
}

.btn-guess:active {
  transform: scale(0.95);
}

.btn-rise {
  background: linear-gradient(to bottom right, #ef4444, #dc2626); /* red-500 to red-600 */
}

.btn-rise:hover {
  box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.3);
}

.btn-fall {
  background: linear-gradient(to bottom right, #3b82f6, #2563eb); /* blue-500 to blue-600 */
}

.btn-fall:hover {
  box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.3);
}

.btn-hover-effect {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-guess:hover .btn-hover-effect {
  opacity: 1;
}

.icon-circle {
  width: 4rem;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  margin-bottom: 0.25rem;
}

.btn-text {
  font-size: 1.125rem;
  font-weight: 900;
  letter-spacing: 0.025em;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  /* Glass Panel */
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);

  padding: 2.5rem;
  border-radius: 2.5rem;
  width: 100%;
  max-width: 28rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  overflow: hidden;
}

.modal-title {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 900;
  color: #1d1d1f;
  margin: 0;
}

.score-display {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.score-label {
  color: #6b7280;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.score-value {
  font-size: 6rem; /* text-8xl */
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  background: linear-gradient(to right, #2563eb, #9333ea);
  -webkit-background-clip: text;
  color: transparent;
}

.rank-card {
  padding: 1.5rem;
  background-color: rgba(249, 250, 251, 0.5); /* gray-50/50 */
  border-radius: 1.5rem;
  border: 1px solid #f3f4f6;
}

.rank-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

.rank-desc {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.625;
  margin: 0;
}

.btn-restart {
  width: 100%;
  padding: 1.25rem;
  background-color: #1d1d1f;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.btn-restart:hover {
  background-color: black;
  transform: scale(1.02);
}

.btn-restart:active {
  transform: scale(0.98);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
