<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useWeatherStore } from '../stores/weatherStore.js'
import SearchBar from '../components/exercise/SearchBar.vue'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import RecentlyViewedList from '../components/exercise/RecentlyViewedList.vue'

const router = useRouter()
const weatherStore = useWeatherStore()

const selectedCityInfo = ref(null) // 선택된 도시 정보를 저장하는 ref (초기 값이 null임)
const searchQuery = ref('')
const searchedCityInfo = ref('')
const recentlyViewed = ref([])
const filteredWeatherList = computed(() => {
  return weatherStore.weatherList.filter((weather) => weather.name.includes(searchQuery.value))
})
const recentCities = computed(() => recentlyViewed.value.slice(0, 5))

watch(selectedCityInfo, (newCity, oldCity) => {
  if (newCity) {
    console.log(
      `선택된 도시가 ${oldCity?.name ?? '없음'}에서 ${newCity.name}(으)로 변경되었습니다.`,
    )

    recentlyViewed.value = recentlyViewed.value.filter((city) => city.id !== newCity.id)
    recentlyViewed.value.unshift(newCity)
  }
})

watchEffect(() => {
  console.log(`현재 검색어: ${searchQuery.value}`)
})

watch(recentlyViewed, (list) => {
  console.log(`최근 확인 목록 갱신: ${list.map((city) => city.name).join(', ')}`)
})

const showDetail = (weather) => {
  router.push('/weather/' + weather.id)
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
        @click-detail="showDetail($event)"
      />
    </BaseDashboardCard>

    <BaseDashboardCard title="최근 확인한 도시" icon="🕓">
      <RecentlyViewedList :cities="recentCities" @select-card="selectedCityInfo = $event" />
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
