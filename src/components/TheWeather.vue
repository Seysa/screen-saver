<template>
  <h2
    id="meteo"
    class="flex flex-col text-black transition-all duration-1000"
    :class="{
      'text-gray-300': hasData && !hidden,
    }"
  >
    <span id="temp">{{ temp }}°C</span>
    <span id="humidity">{{ humidity }}% humidity</span>
    <div>
      <span id="sunrise">{{ sunriseHour }}</span>
      <span class="mx-2">→</span>
      <span id="sunset">{{ sunsetHour }}</span>
    </div>
  </h2>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { queryWeather } from "../weather";
import { toHour } from "../time";

defineProps<{
  hidden: boolean;
}>();

const hasData = ref(false);
const temp = ref(0);
const humidity = ref(0);
const sunrise = ref(0);
const sunset = ref(0);
const sunriseHour = computed(() => toHour(sunrise.value));
const sunsetHour = computed(() => toHour(sunset.value));

async function updateWeather() {
  console.info("query weather...");
  const data = await queryWeather();
  console.log(data);
  const roundedTemp = Math.round(data.current.temp);
  temp.value = roundedTemp;
  humidity.value = data.current.humidity;
  sunrise.value = data.current.sunrise * 1000;
  sunset.value = data.current.sunset * 1000;
  hasData.value = true;
}

updateWeather();
setInterval(updateWeather, 1000 * 60 * 2); // 2 minut
</script>
