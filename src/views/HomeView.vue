<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6">
    <div class="max-w-md w-full text-center space-y-8">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Stock Master
        </h1>
        <p class="text-gray-400">
          Test your investment sense with historical market data.
        </p>
      </div>

      <div class="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
        <div class="space-y-4">
          <div class="flex items-center justify-center space-x-2 text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            <span class="font-semibold">Challenge Mode</span>
          </div>
          <p class="text-sm text-gray-400">
            Predict the next day's price movement (Up/Down) for 10 random historical days.
          </p>
        </div>
      </div>

      <button
        @click="startGame"
        class="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
      >
        Start Game
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGameStore } from '@/stores/gameStore';

const router = useRouter();
const gameStore = useGameStore();

const startGame = async () => {
  await gameStore.startGame();
  router.push('/game');
};
</script>
