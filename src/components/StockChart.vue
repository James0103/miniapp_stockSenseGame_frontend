<template>
  <div class="w-full h-96">
    <apexchart
      type="candlestick"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const series = computed(() => [
  {
    data: props.data.map((item) => ({
      x: new Date(item.date),
      y: [item.open, item.high, item.low, item.close],
    })),
  },
])

const chartOptions = computed(() => ({
  chart: {
    type: 'candlestick',
    height: 350,
    toolbar: {
      show: false,
    },
    background: 'transparent',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  title: {
    text: '주가 추이',
    align: 'left',
    style: {
      color: '#1d1d1f',
      fontSize: '18px',
      fontWeight: '600',
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: '#86868b',
        fontSize: '12px',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
    labels: {
      style: {
        colors: '#86868b',
        fontSize: '12px',
      },
      formatter: (value) => value.toFixed(2),
    },
  },
  grid: {
    borderColor: '#f5f5f7',
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  theme: {
    mode: 'light',
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#34c759', // Apple Green
        downward: '#ff3b30', // Apple Red
      },
      wick: {
        useFillColor: true,
      },
    },
  },
  tooltip: {
    theme: 'light',
    style: {
      fontSize: '12px',
    },
    x: {
      format: 'yyyy년 MM월 dd일',
    },
  },
}))
</script>
