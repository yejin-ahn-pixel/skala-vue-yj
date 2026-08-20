<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const selectedCityInfo = ref(null) // 선택된 도시 정보를 저장하는 ref (초기 값이 null임)
const searchQuery = ref('')
const searchedCityInfo = ref('')
const filteredWeatherList = computed(() => {
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})

watch(selectedCityInfo, (newCity, oldCity) => {
  if (newCity) {
    console.log(
      `선택된 도시가 ${oldCity?.name ?? '없음'}에서 ${newCity.name}(으)로 변경되었습니다.`,
    )
  }
})

watchEffect(() => {
  console.log(`현재 검색어: ${searchQuery.value}`)
})

const weatherList = ref([
  // 날씨 정보를 담은 배열
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    humidity: 55,
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    humidity: 80,
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    humidity: 68,
  },
  {
    id: 'city_04',
    name: '광주',
    temp: 27,
    status: '맑음',
    humidity: 60,
  },
])

const showDetail = (cityName, status) => {
  window.alert(`도시: ${cityName}, 상태: ${status}`)
}

const searchCity = () => {
  console.log(`검색된 도시: ${searchQuery.value}`)
  searchedCityInfo.value = searchQuery.value
}
</script>

<template>
  <div class="weather-page">
    <div class="weather-page__header">
      <h1>Weather Page</h1>
      <p v-if="selectedCityInfo">선택된 도시: {{ selectedCityInfo?.name }}</p>
    </div>

    <div class="city-search">
      <div class="city-search__row">
        <input
          :value="searchQuery"
          @input="searchQuery = $event.target.value"
          @keyup.enter="searchCity"
          type="text"
          placeholder="도시 이름을 입력하세요"
        />
        <button @click="searchCity">검색</button>
      </div>

      <p v-if="searchedCityInfo">입력한 도시: {{ searchedCityInfo }}</p>
    </div>

    <div class="weather-page__content">
      <p v-if="filteredWeatherList.length === 0">일치하는 도시가 없습니다.</p>

      <div
        v-for="weather in filteredWeatherList"
        :key="weather.id"
        class="weather-item"
        :class="{ selected: selectedCityInfo?.id === weather.id }"
        @click="selectedCityInfo = weather"
      >
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

        <button @click.stop="showDetail(weather.name, weather.status)">상세보기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-page {
  text-align: center;
  padding: 24px;
}

.weather-page__header {
  margin-bottom: 24px;
}

.city-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  gap: 12px;
}

.city-search__row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.city-search input {
  padding: 10px 12px;
  width: 220px;
}

.city-search button {
  padding: 10px 16px;
  cursor: pointer;
}

.weather-page__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

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
