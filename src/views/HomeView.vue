<template>
  <div class="home-container">
    <!-- Hero Content -->
    <div class="hero-section">
      <div class="hero-text">
        <h1 class="hero-title">Stock Master</h1>
        <p class="hero-subtitle">시장의 흐름을 <span class="highlight">예측</span>하세요.</p>
      </div>

      <!-- Main Action -->
      <button @click="startGame" class="btn-start">
        <span class="btn-content">
          <span>게임 시작하기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon-arrow"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
        <div class="btn-bg-hover"></div>
      </button>

      <!-- Glass Cards Grid -->
      <div class="features-grid">
        <div class="glass-card">
          <div class="icon-wrapper purple">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9333ea"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>
          <span class="card-text">랭킹 확인</span>
        </div>

        <div class="glass-card">
          <div class="icon-wrapper blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span class="card-text">가이드</span>
        </div>

        <div class="glass-card">
          <div class="icon-wrapper orange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ea580c"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              />
            </svg>
          </div>
          <span class="card-text">설정</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const router = useRouter()
const gameStore = useGameStore()

const startGame = async () => {
  await gameStore.startGame()
  router.push('/game')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.hero-section {
  max-width: 56rem; /* max-w-4xl */
  width: 100%;
  text-align: center;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem; /* space-y-10 */
  margin-top: 2.5rem;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-title {
  font-size: 3.75rem; /* text-6xl */
  font-weight: 900; /* font-black */
  letter-spacing: -0.05em; /* tracking-tighter */
  color: #1d1d1f;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 6rem; /* md:text-8xl */
  }
}

.hero-subtitle {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 300; /* font-light */
  color: #4b5563; /* text-gray-600 */
  margin: 0;
}

@media (min-width: 768px) {
  .hero-subtitle {
    font-size: 1.875rem; /* md:text-3xl */
  }
}

.highlight {
  font-weight: 600;
  color: #2563eb; /* text-blue-600 */
}

/* Button Styles */
.btn-start {
  position: relative;
  padding: 1.25rem 2.5rem;
  background-color: #1d1d1f;
  color: white;
  border-radius: 9999px;
  font-size: 1.25rem; /* text-xl */
  font-weight: 700;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.btn-start:hover {
  transform: scale(1.05);
}

.btn-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-arrow {
  transition: transform 0.3s ease;
}

.btn-start:hover .icon-arrow {
  transform: translateX(4px);
}

.btn-bg-hover {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #2563eb, #9333ea);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-start:hover .btn-bg-hover {
  opacity: 1;
}

/* Grid Styles */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 48rem; /* max-w-3xl */
  margin-top: 3rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Glass Card Styles */
.glass-card {
  /* Replicating .glass-panel */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  padding: 1.5rem;
  border-radius: 1.5rem; /* rounded-3xl */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.glass-card:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.icon-wrapper {
  padding: 0.75rem;
  border-radius: 1rem;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-card:hover .icon-wrapper {
  transform: scale(1.1);
}

.icon-wrapper.purple {
  background-color: #f3e8ff;
} /* purple-100 */
.icon-wrapper.blue {
  background-color: #dbeafe;
} /* blue-100 */
.icon-wrapper.orange {
  background-color: #ffedd5;
} /* orange-100 */

.card-text {
  font-weight: 700;
  color: #374151; /* text-gray-700 */
}

/* Animations */
.animate-fade-up {
  animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
