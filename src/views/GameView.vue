<template>
  <div class="min-h-screen bg-gray-950 text-white p-4 flex flex-col">
    <!-- Header -->
    <header class="flex justify-between items-center mb-6 max-w-4xl mx-auto w-full">
      <div class="flex items-center space-x-4">
        <div class="bg-gray-800 px-4 py-2 rounded-lg">
          <span class="text-gray-400 text-sm">Stage</span>
          <div class="text-xl font-bold">{{ gameStore.currentStage + 1 }} / 10</div>
        </div>
        <div class="bg-gray-800 px-4 py-2 rounded-lg">
          <span class="text-gray-400 text-sm">Score</span>
          <div class="text-xl font-bold text-green-400">{{ gameStore.score }}</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-2xl font-bold">{{ gameStore.symbol }}</div>
        <div class="text-xs text-gray-500">Historical Simulation</div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-4xl mx-auto w-full flex flex-col space-y-6">
      <!-- Chart Area -->
      <div class="relative">
        <StockChart :data="gameStore.visibleData" />
        
        <!-- Loading Overlay -->
        <div v-if="gameStore.isLoading" class="absolute inset-0 bg-gray-900/80 flex items-center justify-center rounded-xl z-10">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>

      <!-- Controls -->
      <div v-if="gameStore.gameStatus === 'playing'" class="grid grid-cols-2 gap-4 mt-auto mb-8">
        <button
          @click="handleGuess('O')"
          class="py-6 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border-2 border-red-500 text-red-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center space-y-2 group"
        >
          <span class="text-4xl font-bold group-hover:text-red-400">O</span>
          <span class="text-sm font-medium">RISE (매수)</span>
        </button>

        <button
          @click="handleGuess('X')"
          class="py-6 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border-2 border-blue-500 text-blue-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center space-y-2 group"
        >
          <span class="text-4xl font-bold group-hover:text-blue-400">X</span>
          <span class="text-sm font-medium">FALL (매도)</span>
        </button>
      </div>

      <!-- Result Modal (Simple overlay for now) -->
      <div v-if="gameStore.gameStatus === 'finished'" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-900 p-8 rounded-3xl max-w-md w-full text-center space-y-6 border border-gray-800 shadow-2xl">
          <h2 class="text-3xl font-bold text-white">Game Over!</h2>
          
          <div class="space-y-2">
            <div class="text-gray-400">Final Score</div>
            <div class="text-6xl font-black bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {{ gameStore.score }}
            </div>
          </div>

          <div class="p-4 bg-gray-800 rounded-xl">
            <div class="text-lg font-semibold text-white mb-1">{{ getRank(gameStore.score) }}</div>
            <p class="text-sm text-gray-400">{{ getRankDescription(gameStore.score) }}</p>
          </div>

          <button
            @click="restartGame"
            class="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '@/stores/gameStore';
import StockChart from '@/components/StockChart.vue';

const router = useRouter();
const gameStore = useGameStore();

onMounted(() => {
  if (gameStore.gameStatus === 'idle') {
    router.push('/');
  }
});

const handleGuess = (guess) => {
  gameStore.submitGuess(guess);
};

const restartGame = async () => {
  await gameStore.startGame();
};

const getRank = (score) => {
  if (score === 100) return 'Market Wizard (투자의 신)';
  if (score >= 80) return 'Wall Street Wolf (월가 늑대)';
  if (score >= 60) return 'Smart Investor (현명한 투자자)';
  if (score >= 40) return 'Average Joe (개미)';
  return 'Paper Hands (마이너스의 손)';
};

const getRankDescription = (score) => {
  if (score === 100) return 'You can see the future! Warren Buffett wants your number.';
  if (score >= 80) return 'Impressive! You have a great feel for the market.';
  if (score >= 60) return 'Not bad! You made some profit.';
  if (score >= 40) return 'Keep practicing. The market is tough.';
  return 'Maybe stick to savings accounts for now...';
};
</script>
