<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const cityId = ref(null)

const props = defineProps(['cityId'])

onMounted(() => {
  cityId.value = mockWeatherList.find((city) => city.id === props.cityId)
})
</script>
