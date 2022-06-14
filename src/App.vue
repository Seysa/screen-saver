<template>
  <div
    class="bg-black text-white overflow-hidden font-['Roboto'] w-screen h-screen flex flex-col gap-4 justify-center items-center"
  >
    <button
      @click="hidden = !hidden"
      class="px-4 py-2 text-black hover:text-white border border-black hover:border-white rounded transition-all duration-500"
    >
      {{ buttonText }}
    </button>
    <TheTimer />
    <TheMeteo :hidden="hidden" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import TheTimer from "./components/TheTimer.vue";
import TheMeteo from "./components/TheMeteo.vue";

const hidden = ref(false);
const buttonText = computed(() => (!hidden.value ? "Hide" : "Show") + " meteo");
</script>
