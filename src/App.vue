<template>
  <div
    class="bg-black text-white overflow-hidden font-['Roboto'] w-screen h-screen flex flex-col gap-4 justify-center items-center"
  >
    <div
      class="text-black hover:text-white border border-black hover:border-white rounded transition-all duration-500 flex gap-2"
    >
      <button @click="hidden = !hidden" class="">
        {{ buttonText }}
      </button>
      <button @click="calibrateGPS">Calibrate GPS</button>
    </div>
    <TheTimer />

    <TheWeather :hidden="hidden" :position="position" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import TheTimer from "./components/TheTimer.vue";
import TheWeather from "./components/TheWeather.vue";

const hidden = ref(false);
const buttonText = computed(
  () => (!hidden.value ? "Hide" : "Show") + " weather"
);

const position = ref<undefined | { latitude: number; longitude: number }>(
  undefined
);

const params = new URLSearchParams(window.location.search);
const lat = params.get("lat") ?? params.get("latitude");
const long = params.get("lon") ?? params.get("long") ?? params.get("longitude");
if (lat && long && !isNaN(Number(lat)) && !isNaN(Number(long))) {
  position.value = {
    latitude: Number(lat),
    longitude: Number(long),
  };
}

console.log("lat long from params", JSON.stringify(position.value));

function calibrateGPS() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (_position) => {
        position.value = _position.coords;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
</script>

<style scoped>
button {
  @apply px-4 py-2 rounded hover:bg-gray-50 hover:bg-opacity-20 transition-all duration-500;
}
</style>
