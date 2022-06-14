<template>
  <div
    class="bg-black text-white overflow-hidden font-['Roboto'] w-screen h-screen flex flex-col gap-4 justify-center items-center"
  >
    <button
      @click="hidden = !hidden"
      class="px-4 py-2 text-black hover:text-white border-2 border-black hover:border-white rounded transition-all duration-500"
    >
      {{ buttonText }}
    </button>
    <h1 id="time" class="text-7xl">{{ time }}</h1>
    <h2
      id="meteo"
      v-show="!hidden"
      class="flex flex-col text-black transition-all duration-1000"
      :class="{
        'text-gray-300': hasData,
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { queryMeteo } from "./meteo";
const buttonText = computed(() => (!hidden.value ? "Hide" : "Show"));

const hidden = ref(false);
const hasData = ref(false);
const time = ref("hh:mm");
const temp = ref(-99);
const humidity = ref(-99);
const sunrise = ref(-99);
const sunset = ref(-99);
const sunriseHour = computed(() => toHour(sunrise.value));
const sunsetHour = computed(() => toHour(sunset.value));

function toHour(date: Date | number, seconds?: boolean): string {
  if (typeof date === "number") {
    return toHour(new Date(date), seconds);
  }
  if (seconds) return date.toLocaleTimeString("fr");
  return date.toLocaleTimeString("fr", { hour: "2-digit", minute: "2-digit" });
}

async function updateWeather() {
  const data = await queryMeteo();
  console.log(data);
  const roundedTemp = Math.round(data.current.temp);
  temp.value = roundedTemp;
  humidity.value = data.current.humidity;
  sunrise.value = data.current.sunrise * 1000;
  sunset.value = data.current.sunset * 1000;
  hasData.value = true;
}

function updateTime() {
  time.value = toHour(new Date(), true);
}

updateTime();
updateWeather();
setInterval(updateWeather, 1000 * 60 * 2); // 2 minutes
setInterval(updateTime, 500); // 2 minutes
</script>
