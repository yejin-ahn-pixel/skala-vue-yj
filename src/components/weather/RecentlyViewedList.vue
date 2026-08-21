<script setup>
defineProps({
  cities: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['select-card'])
</script>

<template>
  <p v-if="cities.length === 0">아직 확인한 도시가 없습니다.</p>

  <ul v-else class="recent-list">
    <li
      v-for="city in cities"
      :key="city.id"
      class="recent-chip"
      @click="emit('select-card', city)"
    >
      {{ city.name }}
    </li>
  </ul>
</template>

<style scoped>
.recent-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.recent-chip {
  padding: 6px 14px;
  border: 1px solid #8bc34a;
  border-radius: 999px;
  background-color: #f1f8e9;
  cursor: pointer;
  font-size: 14px;
}

.recent-chip:hover {
  background-color: #dcedc8;
}
</style>
