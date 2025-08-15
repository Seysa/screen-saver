<template>
  <div
    id="meteo"
    class="flex flex-col text-black transition-all duration-1000"
    :class="{
      'text-gray-300': hasData && !hidden,
    }"
  >
    <span id="temp" class="text-xl">{{ roundedTemp }}°C</span>
    <span id="humidity">{{ data?.current?.humidity }}% humidity</span>
    <div>
      <span id="sunrise">{{ sunriseHour }}</span>
      <span class="mx-2">→</span>
      <span id="sunset">{{ sunsetHour }}</span>
      <span id="wind" class="flex items-center">
        <img src="../icons/arrow_upward.svg" :style="{transform: windIconRotation}" />
        {{ windSpeed }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, Ref, ref, watch } from "vue";
import { queryWeather, WeatherApiResponse } from "../weather";
import { toHour } from "../time";

const props = defineProps<{
  hidden: boolean;
  position?: {
    latitude: number;
    longitude: number;
  };
}>();


const roundedTemp = computed(() => Math.round(data?.value?.current.temp ?? 0));
const sunriseHour = computed(() => toHour(sunrise.value));
const sunsetHour = computed(() => toHour(sunset.value));
const sunrise = computed(() => (data.value?.current.sunrise ?? 0) * 1000);
const sunset = computed(() => (data.value?.current.sunset ?? 0) * 1000);
const hasData = computed(() => data.value !== null && !props.hidden);

const windSpeed = computed(() => {
  const speed = data.value?.current.wind_speed ?? 0;
  return `${Math.round(speed * 3.6)} km/h`; // Convert m/s to km/h
});

// compute icon that is rotated based on wind direction
const windIconRotation = computed(() => {
  const direction = data.value?.current.wind_deg ?? 0;
  return `rotate(${direction}deg)`;
});

const data: Ref<WeatherApiResponse | null> = ref(null);

async function updateWeather() {
  data.value = await queryWeather(props.position);
}

updateWeather();
watch(
  () => props.position,
  (newPosition) => {
    if (newPosition) {
      updateWeather();
    }
  },
  { immediate: true }
);
setInterval(updateWeather, 1000 * 60 * 2); // 2 minutes
</script>
