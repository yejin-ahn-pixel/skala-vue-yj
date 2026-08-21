<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import SearchBar from './SearchBar.vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import WeatherCard from './WeatherCard.vue'

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

    <BaseDashboardCard title="도시 검색" icon="🔍">
      <SearchBar
        :query="searchQuery"
        :searched-city="searchedCityInfo"
        @update:query="searchQuery = $event"
        @search="searchCity"
      />
    </BaseDashboardCard>

    <BaseDashboardCard title="지역별 날씨 현황" icon="📋">
      <p v-if="filteredWeatherList.length === 0">일치하는 도시가 없습니다.</p>

      <WeatherCard
        v-for="weather in filteredWeatherList"
        :key="weather.id"
        :weather="weather"
        :is-selected="selectedCityInfo?.id === weather.id"
        @select-card="selectedCityInfo = $event"
        @click-detail="showDetail($event.name, $event.status)"
      />
    </BaseDashboardCard>
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

</style>
