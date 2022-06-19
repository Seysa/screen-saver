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
import { computed, ref } from "vue";
import TheTimer from "./components/TheTimer.vue";
import TheWeather from "./components/TheWeather.vue";

const hidden = ref(false);
const buttonText = computed(
  () => (!hidden.value ? "Hide" : "Show") + " weather"
);

const position = ref<undefined | { latitude: number; longitude: number }>(
  undefined
);

function calibrateGPS() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (_position) => {
        console.log(_position);
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
