<template>
  <div class="stats stats-vertical shadow mt-8">
    <div class="stat">
      <div class="stat-title">已背单词数</div>
      <div class="stat-value">{{ useCounterStore().beginIndex }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">还剩单词数</div>
      <div class="stat-value">{{ rest }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">还需几天背完</div>
      <div class="stat-value">{{ day }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/count";
const rest = 5500 - useCounterStore().beginIndex;
const day = Math.ceil(rest / useCounterStore().count);
</script>

<style scoped></style>
