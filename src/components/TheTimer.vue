<template>
  <h1 id="time" class="text-7xl">{{ time }}</h1>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { toHour } from "../time";

const time = ref("hh:mm");

function updateTime() {
  time.value = toHour(new Date(), true);
}

updateTime();
setInterval(updateTime, 500); // 2 minutes
</script>
