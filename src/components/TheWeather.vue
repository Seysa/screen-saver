<template>
  <div
    id="meteo"
    class="flex flex-col transition-all duration-1000 text-gray-300 opacity-0"
    :class="{
      'opacity-100': hasData && !hidden,
    }"
  >
    <span id="temp" class="text-xl">{{ roundedTemp }}°C</span>
    <span id="humidity">{{ data?.current?.humidity }}% humidity</span>
    <div>
      <span id="sunrise">{{ sunriseHour }}</span>
      <span class="mx-2">→</span>
      <span id="sunset">{{ sunsetHour }}</span>
      <span id="wind" class="flex items-center">
        <img
          src="../icons/arrow_upward.svg"
          :style="{ transform: windIconRotation }"
        />
        {{ windSpeed }}
      </span>
    </div>
  </div>
  <div
    id="week-forecast"
    class="flex gap-2 mt-2 opacity-0 transition-all duration-1000"
    :class="{
      'opacity-100': hasData && !hidden,
    }"
  >
    <template v-for="(day, i) in weekForecast" :key="i">
      <div
        class="flex flex-col items-center text-xs px-1 rounded transition-all"
        :class="{
          'bg-white bg-opacity-10 text-white font-extrabold': day.isToday
        }"
      >
        <span>{{ day.day }}</span>
        <img
          :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`"
          alt="icon"
          class="w-6 h-6"
        />
        <span>{{ day.temp }}°</span>
      </div>
    </template>
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
  // + 180 because the icon points up and we want it to point in the direction of the wind, which is opposite to the arrow
  return `rotate(${(direction + 180) % 360}deg)`;
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

const weekForecast = computed(() => {
  if (!data.value?.daily) return [];
  const today = new Date();
  return data.value.daily.slice(0, 7).map((d: any) => {
    const date = new Date(d.dt * 1000);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      temp: Math.round(d.temp.day),
      icon: d.weather?.[0]?.icon ?? "01d",
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    };
  });
});
</script>
