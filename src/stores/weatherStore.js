import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherList: [
      { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 55 },
      { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 80 },
      { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 68 },
      { id: 'city_04', name: '광주', temp: 27, status: '맑음', humidity: 60 },
    ],
  }),
})
