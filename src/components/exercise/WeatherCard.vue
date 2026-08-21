<script setup>
defineProps({
  weather: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <div class="weather-item" :class="{ selected: isSelected }" @click="emit('select-card', weather)">
    <div class="weather-item__header">
      <h2>{{ weather.name }}</h2>
      <span
        class="temp-badge"
        :class="{
          'temp-badge--hot': weather.temp >= 28,
          'temp-badge--warm': weather.temp >= 25 && weather.temp < 28,
          'temp-badge--cool': weather.temp < 25,
        }"
      >
        <template v-if="weather.temp >= 28">🔥 매우 더움</template>
        <template v-else-if="weather.temp >= 25">☀️ 따뜻함</template>
        <template v-else>❄️ 선선함</template>
      </span>
    </div>

    <p>실시간 온도: {{ weather.temp }}°C</p>
    <p>상태: {{ weather.status }}</p>
    <p>습도: {{ weather.humidity }}%</p>

    <button @click.stop="emit('click-detail', weather)">상세보기</button>
  </div>
</template>

<style scoped>
.weather-item {
  width: 280px;
  border: 1px solid #8bc34a;
  background-color: #e8f5e9;
  padding: 16px;
  cursor: pointer;
  text-align: left;
}

.weather-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.weather-item__header h2 {
  margin: 0;
}

.temp-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  border: 1px solid transparent;
}

.temp-badge--hot {
  background: #ffe0e0;
  border-color: #ff8a80;
  color: #b71c1c;
}

.temp-badge--warm {
  background: #fff3cd;
  border-color: #ffca28;
  color: #8a6d00;
}

.temp-badge--cool {
  background: #dfefff;
  border-color: #64b5f6;
  color: #0d47a1;
}

.weather-item button {
  display: block;
  margin: 12px auto 0;
  padding: 6px 12px;
  border: none;
  background-color: #8bc34a;
  color: #fff;
  cursor: pointer;
}

.selected {
  border: 2px solid green;
  background-color: #dff7df;
}
</style>
