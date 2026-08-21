<script    setup>

defineProps({
  query: String,        // 검색창에 표시할 텍스트 (searchQuery)
  searchedCity: String,  // "입력한 도시: OO" 문구용 (searchedCityInfo)
})

const emit = defineEmits(['update:query', 'search'])

</script>

<template>
  <div class="city-search">
    <div class="city-search__row">
      <input
        :value="query"
        @input="emit('update:query', $event.target.value)"
        @keyup.enter="emit('search')"
        type="text"
        placeholder="도시를 입력하세요"
      />
      <button @click="emit('search')">검색</button>
    </div>

    <p v-if="searchedCity">입력한 도시: {{ searchedCity }}</p>
  </div>
</template>

<style scoped>
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
</style>