<template>
  <div
    id="meteo"
    class="flex flex-col text-black transition-all duration-1000"
    :class="{
      'text-gray-300': hasData && !hidden,
    }"
  >
    <span id="temp">{{ roundedTemp }}°C</span>
    <span id="humidity">{{ data?.current?.humidity }}% humidity</span>
    <div>
      <span id="sunrise">{{ sunriseHour }}</span>
      <span class="mx-2">→</span>
      <span id="sunset">{{ sunsetHour }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, Ref, ref } from "vue";
import { queryWeather, WeatherApiResponse } from "../weather";
import { toHour } from "../time";

defineProps<{
  hidden: boolean;
}>();

const hasData = ref(false);
const sunrise = ref(0);
const sunset = ref(0);

const roundedTemp = computed(() => Math.round(data?.value?.current.temp ?? 0));
const sunriseHour = computed(() => toHour(sunrise.value));
const sunsetHour = computed(() => toHour(sunset.value));

const data: Ref<WeatherApiResponse | null> = ref(null);

async function updateWeather() {
  data.value = await queryWeather();
  sunrise.value = data.value.current.sunrise * 1000;
  sunset.value = data.value.current.sunset * 1000;
  hasData.value = true;
}

updateWeather();
setInterval(updateWeather, 1000 * 60 * 2); // 2 minut
</script>
