<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="dashboard-card">
    <div class="dashboard-card__header">
      <span v-if="icon">{{ icon }}</span>
      <h2>{{ title }}</h2>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.dashboard-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
.dashboard-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
