<template>
  <div class="w-full h-96 bg-gray-900 rounded-xl p-4 shadow-lg">
    <apexchart
      type="candlestick"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const series = computed(() => [{
  data: props.data.map((item) => ({
    x: new Date(item.date),
    y: [item.open, item.high, item.low, item.close],
  })),
}]);

const chartOptions = computed(() => ({
  chart: {
    type: 'candlestick',
    height: 350,
    toolbar: {
      show: false,
    },
    background: 'transparent',
  },
  title: {
    text: 'Stock Price History',
    align: 'left',
    style: {
      color: '#fff',
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: '#9ca3af',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
    labels: {
      style: {
        colors: '#9ca3af',
      },
      formatter: (value) => value.toFixed(2),
    },
  },
  grid: {
    borderColor: '#374151',
    strokeDashArray: 4,
  },
  theme: {
    mode: 'dark',
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#10B981', // Green
        downward: '#EF4444', // Red
      },
    },
  },
}));
</script>
